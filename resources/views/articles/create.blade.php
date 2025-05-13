@extends('layouts.app')

@section('title', 'Создание статьи')

@section('content')
<div class="card">
    <div class="card-header">
        <h1>Создание новой статьи</h1>
    </div>

    <div class="card-body">
        <form action="{{ route('articles.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label for="title" class="form-label">Название</label>
                <input type="text" name="title" id="title" class="form-control @error('title') is-invalid @enderror" value="{{ old('title') }}" required>
                @error('title')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="abstract" class="form-label">Аннотация</label>
                <textarea name="abstract" id="abstract" class="form-control @error('abstract') is-invalid @enderror" required>{{ old('abstract') }}</textarea>
                @error('abstract')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="keywords" class="form-label">Ключевые слова (через запятую)</label>
                <input type="text" name="keywords" id="keywords" class="form-control @error('keywords') is-invalid @enderror" value="{{ old('keywords') }}" required>
                @error('keywords')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="content" class="form-label">Содержание</label>
                <textarea name="content" id="content" class="form-control @error('content') is-invalid @enderror" rows="10" required>{{ old('content') }}</textarea>
                @error('content')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="status" class="form-label">Статус</label>
                <select name="status" id="status" class="form-control @error('status') is-invalid @enderror" required>
                    <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>Черновик</option>
                    <option value="under_review" {{ old('status') === 'under_review' ? 'selected' : '' }}>Отправить на проверку</option>
                </select>
                @error('status')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn btn-primary">Создать статью</button>
        </form>
    </div>
</div>
@endsection