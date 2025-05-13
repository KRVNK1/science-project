<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request, Article $article)
    {
        $validated = $request->validate([
            'content' => 'required',
        ]);

        $article->comments()->create([
            'user_id' => Auth::id(),
            'content' => $validated['content'],
        ]);

        return redirect()->back()->with('success', 'Комментарий успешно добавлен.');
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        
        $comment->delete();
        
        return redirect()->back()->with('success', 'Комментарий успешно удален.');
    }
}