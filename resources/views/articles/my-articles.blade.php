@extends('layouts.app')

@section('title', 'Мои статьи')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Мои статьи</h1>
    <a href="{{ route('articles.create') }}" class="btn btn-primary">Создать новую статью</a>
</div>

@if($articles->isEmpty())
<div class="alert alert-info">
    Вы еще не создали ни одной статьи.
</div>
@else
<div class="table-responsive">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Название</th>
                <th>Статус</th>
                <th>Создано</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            @foreach($articles as $article)
            <tr>
                <td>
                    <a href="{{ route('articles.show', $article) }}">{{ $article->title }}</a>
                </td>
                <td>
                    @if($article->status == 'draft')
                    Черновик
                    @elseif($article->status == 'under_review')
                    На проверке
                    @elseif($article->status == 'rejected')
                    Отклонено
                    @elseif($article->status == 'published')
                    Опубликовано
                    @endif
                </td>
                <td>{{ $article->created_at->format('d.m.Y') }}</td>
                <td>
                    <a href="{{ route('articles.edit', $article) }}" class="btn btn-sm btn-primary">Редактировать</a>

                    <form action="{{ route('articles.destroy', $article) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Вы уверены, что хотите удалить эту статью?')">Удалить</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

{{ $articles->links() }}
@endif
@endsection