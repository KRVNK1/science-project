<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->isAdmin();
    }

    public function create(User $user)
    {
        return $user->isAdmin() || $user->isAuthor();
    }

    public function update(User $user, Article $article)
    {
        return $user->isAdmin() || $user->id === $article->user_id;
    }

    public function delete(User $user, Article $article)
    {
        return $user->isAdmin() || $user->id === $article->user_id;
    }

    public function updateStatus(User $user, Article $article)
    {
        return $user->isAdmin();
    }
}