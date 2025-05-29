<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    // Страница всех статей
    public function index(Request $request)
    {
        $query = Article::with(['user', 'comments', 'ratings'])
            ->where('status', 'published');

        // Поиск по названию, ключ.словам и авторам
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('keywords', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $articles = $query->latest()->paginate(9);

        // Сохранение параметра в поиске, чтобы пагинация не пропадала
        $articles->appends(['search' => $request->search]);

        $articles->getCollection()->transform(function ($article) {
            $article->average_rating = $article->average_rating;
            return $article;
        });


        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'filters' => $request->only(['search'])
        ]);
    }

    // Главная страница
    public function welcome()
    {
        $sampleArticles = Article::with(['user', 'comments', 'ratings'])
            ->where('status', 'published')
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($article) {
                $article->keywords = explode(',', $article->keywords);
                $article->average_rating = $article->getAverageRatingAttribute(); // метод в модели Article
                return $article;
            });

        return Inertia::render('Welcome', [
            'sampleArticles' => $sampleArticles
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'keywords' => 'required|string',
            'content' => 'required|string',
            'references' => 'required|string',
        ]);

        $article = new Article();
        $article->title = $validated['title'];
        $article->abstract = $validated['abstract'];
        $article->keywords = $validated['keywords'];
        $article->content = $validated['content'];
        $article->references = $validated['references'] ?? null;
        $article->status = 'draft';
        $article->user_id = Auth::id();
        $article->save();

        return redirect()->route('articles.show', $article->id);
    }


    public function show(Article $article)
    {
        $article->load(['user', 'comments.user', 'ratings']);

        // Вычисление средней оценки
        $averageRating = $article->ratings->avg('rating');
        $article->average_rating = $averageRating ? (float)$averageRating : null;

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'canEdit' => Auth::id() === $article->user_id || (Auth::check() && Auth::user()->role === 'admin'),
            'canDestroy' => Auth::id() === $article->user_id || (Auth::check() && Auth::user()->role === 'admin')
        ]);
    }

    public function edit(Article $article)
    {
        if (Auth::id() !== $article->user_id && Auth::user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Articles/Edit', [
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article)
    {
        if (Auth::id() !== $article->user_id && Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'keywords' => 'required|string',
            'content' => 'required|string',
            'references' => 'required|string',
        ]);

        $article->title = $validated['title'];
        $article->abstract = $validated['abstract'];
        $article->keywords = $validated['keywords'];
        $article->content = $validated['content'];
        $article->references = $validated['references'];
        $article->save();

        return redirect()->route('articles.show', $article->id);
    }

    public function destroy(Article $article)
    {
        if (Auth::id() !== $article->user_id && Auth::user()->role !== 'admin') {
            abort(403);
        }

        $article->delete();

        return redirect()->route('articles.user');
    }


    // public function topArticles()
    // {
    //     $articles = Article::with(['user', 'comments', 'ratings'])
    //         ->where('status', 'published')
    //         ->withAvg('ratings', 'rating')
    //         ->orderByDesc('ratings_avg_rating')
    //         ->take(9)
    //         ->get();

    //     return Inertia::render('Articles/TopArticles', [
    //         'articles' => $articles
    //     ]);
    // }


    // Статьи пользователя
    public function userArticles()
    {
        $articles = Article::with(['comments', 'ratings'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Articles/UserArticles', [
            'articles' => $articles
        ]);
    }

    // Отправка на проверку
    public function submitForReview(Article $article)
    {
        if (Auth::id() !== $article->user_id) {
            abort(403);
        }

        if ($article->status !== 'draft') {
            abort(400, 'Можно отправлять только черновики');
        }

        $article->status = 'under_review';
        $article->save();

        return redirect()->route('articles.show', $article->id);
    }

    // Одобрение статьи
    public function approve(Article $article)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $article->status = 'published';
        $article->save();

        return redirect()->route('articles.show', $article->id);
    }

    // Отклонение статьи
    public function reject(Article $article)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $article->status = 'rejected';
        $article->save();

        return redirect()->route('articles.show', $article->id);
    }
}
