@extends('layouts.app')

@section('title', $article->title)

@section('content')
<div class="card">
    <div class="card-header">
        <h1>{{ $article->title }}</h1>

        <div class="article-meta">
            <span>Автор: {{ $article->user->name }}</span> |
            <span>{{ $article->created_at->format('d.m.Y') }}</span> |
            <span>Статус:
                @if($article->status == 'draft')
                Черновик
                @elseif($article->status == 'under_review')
                На проверке
                @elseif($article->status == 'rejected')
                Отклонено
                @elseif($article->status == 'published')
                Опубликовано
                @endif
            </span>
        </div>

        <div class="article-rating">
            @for($i = 1; $i <= 5; $i++)
                <i class="fas fa-star star {{ $i <= $article->average_rating ? '' : 'far' }}"></i>
                @endfor
                <span>({{ $article->ratings->count() }})</span>
        </div>

        <div class="article-keywords">
            @foreach(explode(',', $article->keywords) as $keyword)
            <span class="keyword">{{ trim($keyword) }}</span>
            @endforeach
        </div>
    </div>

    <div class="card-body">
        <div class="article-abstract">
            <h3>Аннотация</h3>
            <p>{{ $article->abstract }}</p>
        </div>

        <div class="article-content">
            <h3>Содержание</h3>
            <div>{{ $article->content }}</div>
        </div>

        @auth
        @if(Auth::id() === $article->user_id || Auth::user()->isAdmin())
        <div class="article-actions" style="margin-top: 2rem;">
            <a href="{{ route('articles.edit', $article) }}" class="btn btn-primary">Редактировать</a>

            <form action="{{ route('articles.destroy', $article) }}" method="POST" style="display: inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger" onclick="return confirm('Вы уверены, что хотите удалить эту статью?')">Удалить</button>
            </form>
        </div>
        @endif

        @if(Auth::user()->isAdmin() && $article->status !== 'published')
        <div class="admin-actions" style="margin-top: 1rem;">
            <form action="{{ route('admin.articles.status', $article) }}" method="POST">
                @csrf
                @method('PATCH')
                <div class="form-group">
                    <label for="status" class="form-label">Обновить статус:</label>
                    <select name="status" id="status" class="form-control" style="width: auto; display: inline-block; margin-right: 1rem;">
                        <option value="draft" {{ $article->status === 'draft' ? 'selected' : '' }}>Черновик</option>
                        <option value="under_review" {{ $article->status === 'under_review' ? 'selected' : '' }}>На проверке</option>
                        <option value="rejected" {{ $article->status === 'rejected' ? 'selected' : '' }}>Отклонено</option>
                        <option value="published" {{ $article->status === 'published' ? 'selected' : '' }}>Опубликовано</option>
                    </select>
                    <button type="submit" class="btn btn-primary">Обновить</button>
                </div>
            </form>
        </div>
        @endif

        @if($article->status === 'published')
        <div class="rating-section" style="margin-top: 2rem;">
            <h3>Оцените эту статью</h3>
            <form action="{{ route('ratings.store', $article) }}" method="POST">
                @csrf
                <div class="form-group">
                    <div class="rating-stars">
                        @for($i = 5; $i >= 1; $i--)
                        <label>
                            <input type="radio" name="rating" value="{{ $i }}" {{ $userRating && $userRating->rating === $i ? 'checked' : '' }}>
                            <i class="fas fa-star"></i>
                        </label>
                        @endfor
                    </div>
                    <button type="submit" class="btn btn-primary">Отправить оценку</button>
                </div>
            </form>
        </div>
        @endif
        @endauth
    </div>
</div>

<div class="card" style="margin-top: 2rem;">
    <div class="card-header">
        <h2>Комментарии ({{ $article->comments->count() }})</h2>
    </div>

    <div class="card-body">
        @if($article->comments->isEmpty())
        <p>Пока нет комментариев. Будьте первым, кто оставит комментарий!</p>
        @else
        <div class="comments-list">
            @foreach($article->comments as $comment)
            <div class="comment">
                <div class="comment-meta">
                    <span class="comment-author">{{ $comment->user->name }}</span>
                    <span class="comment-date">{{ $comment->created_at->format('d.m.Y H:i') }}</span>
                </div>
                <div class="comment-content">
                    {{ $comment->content }}
                </div>

                @auth
                @if(Auth::id() === $comment->user_id || Auth::user()->isAdmin())
                <div class="comment-actions" style="margin-top: 0.5rem; text-align: right;">
                    <form action="{{ route('comments.destroy', $comment) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Вы уверены, что хотите удалить этот комментарий?')">Удалить</button>
                    </form>
                </div>
                @endif
                @endauth
            </div>
            @endforeach
        </div>
        @endif

        @auth
        <div class="comment-form" style="margin-top: 2rem;">
            <h3>Добавить комментарий</h3>
            <form action="{{ route('comments.store', $article) }}" method="POST">
                @csrf
                <div class="form-group">
                    <textarea name="content" class="form-control" placeholder="Ваш комментарий" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Отправить комментарий</button>
            </form>
        </div>
        @else
        <div style="margin-top: 2rem;">
            <p>Пожалуйста, <a href="{{ route('login') }}">войдите</a>, чтобы оставить комментарий.</p>
        </div>
        @endauth
    </div>
</div>
@endsection