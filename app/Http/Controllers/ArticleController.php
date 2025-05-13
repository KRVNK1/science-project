<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ArticleController extends Controller
{
    public function __construct()
    {
        // Используем метод middleware из базового класса Controller
        $this->middleware('auth')->except(['index', 'create', 'show', 'search']);
    }

    public function index()
    {
        $articles = Article::published()->with('user')->latest()->paginate(10);
        return view('articles.index', compact('articles'));
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $articles = Article::published()
            ->search($search)
            ->with('user')
            ->latest()
            ->paginate(10);
        
        return view('articles.index', compact('articles', 'search'));
    }

    public function create()
    {
        // Используем метод authorize из трейта AuthorizesRequests
        // $this->authorize('create', Article::class);
        return view('articles.create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Article::class);
        
        $validated = $request->validate([
            'title' => 'required|max:255',
            'abstract' => 'required',
            'keywords' => 'required',
            'content' => 'required',
            'status' => 'required|in:draft,under_review',
        ]);

        // Используем метод articles() из модели User
        $article = Auth::user()->articles()->create($validated);
        
        return redirect()->route('articles.show', $article)
            ->with('success', 'Статья успешно создана.');
    }

    public function show(Article $article)
    {
        if ($article->status !== 'published' && 
            (Auth::guest() || (Auth::id() !== $article->user_id && !Auth::user()->isAdmin()))) {
            abort(403);
        }

        $article->load(['user', 'comments.user']);
        $userRating = null;
        
        if (Auth::check()) {
            $userRating = $article->ratings()->where('user_id', Auth::id())->first();
        }
        
        return view('articles.show', compact('article', 'userRating'));
    }

    public function edit(Article $article)
    {
        $this->authorize('update', $article);
        return view('articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);
        
        $validated = $request->validate([
            'title' => 'required|max:255',
            'abstract' => 'required',
            'keywords' => 'required',
            'content' => 'required',
            'status' => 'required|in:draft,under_review',
        ]);

        $article->update($validated);
        
        return redirect()->route('articles.show', $article)
            ->with('success', 'Статья успешно обновлена.');
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        
        $article->delete();
        
        return redirect()->route('articles.index')
            ->with('success', 'Статья успешно удалена.');
    }

    public function myArticles()
    {
        $articles = Auth::user()->articles()->latest()->paginate(10);
        return view('articles.my-articles', compact('articles'));
    }

    // Методы администратора
    public function adminIndex()
    {
        $this->authorize('viewAny', Article::class);
        
        $articles = Article::with('user')->latest()->paginate(10);
        return view('admin.articles.index', compact('articles'));
    }

    public function updateStatus(Request $request, Article $article)
    {
        $this->authorize('updateStatus', $article);
        
        $validated = $request->validate([
            'status' => 'required|in:draft,under_review,rejected,published',
        ]);

        $article->update($validated);
        
        return redirect()->back()->with('success', 'Статус статьи успешно обновлен.');
    }
}