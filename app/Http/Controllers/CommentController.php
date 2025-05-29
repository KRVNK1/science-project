<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Article;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Request $request, Article $article)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        // Создаем комментарий
        $comment = new Comment();
        $comment->content = $validated['content'];
        $comment->user_id = Auth::id();
        $comment->article_id = $article->id;
        $comment->rating = $validated['rating']; // Сохраняем рейтинг в комментарии для отображения
        $comment->save();

        // Создаем или обновляем рейтинг
        Rating::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'article_id' => $article->id
            ],
            [
                'rating' => $validated['rating']
            ]
        );

        return redirect()->back();
    }

    public function destroy(Comment $comment)
    {
        if (Auth::id() !== $comment->user_id && Auth::user()->role !== 'admin') {
            abort(403);
        }

        // Сохраняем ID пользователя и статьи перед удалением комментария
        $userId = $comment->user_id;
        $articleId = $comment->article_id;
        
        // Удаляем комментарий
        $comment->delete();
        
        // Удаляем соответствующую запись рейтинга
        Rating::where('user_id', $userId)
              ->where('article_id', $articleId)
              ->delete();

        return redirect()->back()->with('message', 'Комментарий успешно удален');
    }
}
