<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Article;

class ProfileController extends Controller
{
    // Статьи пользователя в личном кабинете
    public function index(Request $request): Response
    {
        $articles = Article::with(['comments', 'ratings'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function ($article) {
                $article->average_rating = $article->ratings->avg('rating');
                $article->keywords = is_string($article->keywords)
                    ? explode(',', $article->keywords)
                    : (array)$article->keywords;
                return $article;
            });

        // Статьи для проверки
        $articlesForReview = [];

        if ($request->user()->role === 'admin') {
            $articlesForReview = Article::with(['comments', 'ratings', 'user'])
                ->where('status', 'under_review')
                ->latest()
                ->get()
                ->map(function ($article) {
                    $article->average_rating = $article->ratings->avg('rating');
                    $article->keywords = is_string($article->keywords)
                        ? explode(',', $article->keywords)
                        : (array)$article->keywords;
                    return $article;
                });
        }

        return Inertia::render('Profile/Index', [
            'status' => session('status'),
            'articles' => $articles,
            'articlesForReview' => $articlesForReview,
            'isAdmin' => $request->user()->role === 'admin'
        ]);
    }

    // Страница редактирования профиля
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
            'user' => $request->user()->only(['name', 'email']),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }


    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
