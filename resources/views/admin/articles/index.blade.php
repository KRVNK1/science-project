@extends('layouts.app')

@section('title', 'Администратор - Управление статьями')

@section('content')
    <h1>Управление статьями</h1>
    
    <form action="{{ route('admin.articles.index') }}" method="GET" class="search-form">
        <div class="search-input-group">
            <input type="text" name="search" class="form-control search-input" placeholder="Поиск статей" value="{{ request('search') }}">
            <button type="submit" class="btn btn-primary search-btn">
                <i class="fas fa-search"></i> Поиск
            </button>
        </div>
    </form>
    
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Автор</th>
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
                        <td>{{ $article->user->name }}</td>
                        <td>
                            <form action="{{ route('admin.articles.status', $article) }}" method="POST" class="status-form">
                                @csrf
                                @method('PATCH')
                                <select name="status" class="form-control form-control-sm" onchange="this.form.submit()">
                                    <option value="draft" {{ $article->status === 'draft' ? 'selected' : '' }}>Черновик</option>
                                    <option value="under_review" {{ $article->status === 'under_review' ? 'selected' : '' }}>На проверке</option>
                                    <option value="rejected" {{ $article->status === 'rejected' ? 'selected' : '' }}>Отклонено</option>
                                    <option value="published" {{ $article->status === 'published' ? 'selected' : '' }}>Опубликовано</option>
                                </select>
                            </form>
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
@endsection