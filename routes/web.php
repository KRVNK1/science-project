<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

// Защищенные маршруты
Route::middleware(['auth'])->group(function () {
    // Управление статьями пользователя
    Route::get('/my-articles', [ArticleController::class, 'myArticles'])->name('articles.my');
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');

    // Комментарии
    Route::post('/articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Оценки
    Route::post('/articles/{article}/ratings', [RatingController::class, 'store'])->name('ratings.store');
});     

// Публичные маршруты
Route::get('/', [ArticleController::class, 'index'])->name('home');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/search', [ArticleController::class, 'search'])->name('articles.search');
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

// Маршруты аутентификации
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

// Маршруты администратора
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/articles', [ArticleController::class, 'adminIndex'])->name('admin.articles.index');
    Route::patch('/articles/{article}/status', [ArticleController::class, 'updateStatus'])->name('admin.articles.status');
});
