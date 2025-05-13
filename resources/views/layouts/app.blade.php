<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Платформа научных статей')</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>

<body>
    <header class="header">
        <div class="container header-container">
            <a href="{{ route('home') }}" class="logo">НаучСтатьи</a>

            <button class="mobile-menu-toggle" id="mobileMenuToggle">
                <i class="fas fa-bars"></i>
            </button>

            <ul class="nav-menu" id="navMenu">
                <li><a href="{{ route('articles.index') }}">Статьи</a></li>

                @guest
                <li><a href="{{ route('login') }}">Вход</a></li>
                <li><a href="{{ route('register') }}">Регистрация</a></li>
                @else
                @if(Auth::user()->isAuthor() || Auth::user()->isAdmin())
                <li><a href="{{ route('articles.my') }}">Мои статьи</a></li>
                <li><a href="{{ route('articles.create') }}">Создать статью</a></li>
                @endif

                @if(Auth::user()->isAdmin())
                <li><a href="{{ route('admin.articles.index') }}">Панель администратора</a></li>
                @endif

                <li>
                    <a href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        Выход
                    </a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </li>
                @endguest
            </ul>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
            @endif

            @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
            @endif

            @yield('content')
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>НаучСтатьи</h3>
                    <p>Платформа для публикации и обсуждения научных исследований.</p>
                </div>

                <div class="footer-section">
                    <h3>Быстрые ссылки</h3>
                    <ul class="footer-links">
                        <li><a href="{{ route('home') }}">Главная</a></li>
                        <li><a href="{{ route('articles.index') }}">Статьи</a></li>
                        @guest
                        <li><a href="{{ route('login') }}">Вход</a></li>
                        <li><a href="{{ route('register') }}">Регистрация</a></li>
                        @endguest
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Контакты</h3>
                    <p>Email: info@nauchstatyi.ru</p>
                    <p>Телефон: +7 (123) 456-7890</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} НаучСтатьи. Все права защищены.</p>
            </div>
        </div>
    </footer>

    <script>
        // Переключение мобильного меню
        document.getElementById('mobileMenuToggle').addEventListener('click', function() {
            document.getElementById('navMenu').classList.toggle('active');
        });
    </script>
</body>

</html>