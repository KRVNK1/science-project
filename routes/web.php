<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ArticleController::class, 'welcome']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Статьи
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/top-articles', [ArticleController::class, 'topArticles'])->name('articles.top');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware('auth')->group(function () {
    // Профиль
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Статьи пользователя
    Route::get('/my-articles', [ArticleController::class, 'userArticles'])->name('articles.user');
    
    // Все для статей
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::patch('/articles/{article}/submit', [ArticleController::class, 'submitForReview'])->name('articles.submit');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    
    // админская тема
    Route::middleware(['auth' ,'admin'])->group(function () {
        Route::patch('/articles/{article}/approve', [ArticleController::class, 'approve'])->name('articles.approve');
        Route::patch('/articles/{article}/reject', [ArticleController::class, 'reject'])->name('articles.reject');
    });
    
    // Комментарии
    Route::post('/articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    
});

require __DIR__.'/auth.php';
