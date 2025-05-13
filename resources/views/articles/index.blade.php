@extends('layouts.app')

@section('title', 'Научные статьи')

@section('content')
<h1>Научные статьи</h1>

<form action="{{ route('articles.search') }}" method="GET" class="search-form">
    <div class="search-input-group">
        <input type="text" name="search" class="form-control search-input" placeholder="Поиск по названию, ключевым словам или содержанию" value="{{ $search ?? '' }}">
        <button type="submit" class="btn btn-primary search-btn">
            <i class="fas fa-search"></i> Поиск
        </button>
    </div>
</form>

@if(isset($search) && $articles->isEmpty())
<div class="alert alert-info">
    Статьи по запросу "{{ $search }}" не найдены.
</div>
@endif

<div class="article-list">
    @foreach($articles as $article)
    <div class="card article-card">
        <div class="card-body">
            <h2 class="article-title">
                <a href="{{ route('articles.show', $article) }}">{{ $article->title }}</a>
            </h2>

            <div class="article-meta">
                <span>Автор: {{ $article->user->name }}</span> |
                <span>{{ $article->created_at->format('d.m.Y') }}</span>
            </div>

            <div class="article-rating">
                @for($i = 1; $i <= 5; $i++)
                    <i class="fas fa-star star {{ $i <= $article->average_rating ? '' : 'far' }}"></i>
                    @endfor
                    <span>({{ $article->ratings->count() }})</span>
            </div>

            <div class="article-abstract">
                {{ Str::limit($article->abstract, 150) }}
            </div>

            <div class="article-keywords">
                @foreach(explode(',', $article->keywords) as $keyword)
                <span class="keyword">{{ trim($keyword) }}</span>
                @endforeach
            </div>

            <a href="{{ route('articles.show', $article) }}" class="btn btn-primary">Читать далее</a>
        </div>
    </div>
    @endforeach
</div>

{{ $articles->links() }}
@endsection