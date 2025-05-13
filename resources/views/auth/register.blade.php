@extends('layouts.app')

@section('title', 'Регистрация')

@section('content')
<div class="auth-container">
    <div class="card">
        <div class="card-header">
            <h1>Регистрация</h1>
        </div>

        <div class="card-body">
            <form method="POST" action="{{ route('register') }}">
                @csrf

                <div class="form-group">
                    <label for="name" class="form-label">Имя</label>
                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                    @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
                    @error('email')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="role" class="form-label">Роль</label>
                    <select id="role" class="form-control @error('role') is-invalid @enderror" name="role" required>
                        <option value="reader" {{ old('role') === 'reader' ? 'selected' : '' }}>Читатель</option>
                        <option value="author" {{ old('role') === 'author' ? 'selected' : '' }}>Автор</option>
                    </select>
                    @error('role')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Пароль</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
                    @error('password')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password-confirm" class="form-label">Подтверждение пароля</label>
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">
                        Зарегистрироваться
                    </button>
                </div>

                <div class="form-group text-center">
                    <p>Уже есть аккаунт? <a href="{{ route('login') }}">Войти</a></p>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection