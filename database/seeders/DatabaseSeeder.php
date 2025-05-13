<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Rating;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Создать администратора
        $admin = User::create([
            'name' => 'Администратор',
            'email' => 'admin@example.com',
            'password' => '12345678',
            'role' => 'admin',
        ]);

        // Создать авторов
        $author1 = User::create([
            'name' => 'Иван Исследователь',
            'email' => 'ivan@example.com',
            'password' => '12345678',
            'role' => 'author',
        ]);

        $author2 = User::create([
            'name' => 'Елена Ученая',
            'email' => 'elena@example.com',
            'password' => '12345678',
            'role' => 'author',
        ]);

        // Создать читателя
        $reader = User::create([
            'name' => 'Читатель',
            'email' => 'reader@example.com',
            'password' => '12345678',
            'role' => 'reader',
        ]);

        // Создать статьи
        $article1 = Article::create([
            'user_id' => $author1->id,
            'title' => 'Достижения в области искусственного интеллекта',
            'abstract' => 'В этой статье рассматриваются последние достижения в области искусственного интеллекта и машинного обучения, с акцентом на нейронные сети и приложения глубокого обучения.',
            'keywords' => 'ИИ, машинное обучение, нейронные сети, глубокое обучение',
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
            'status' => 'published',
        ]);

        $article2 = Article::create([
            'user_id' => $author2->id,
            'title' => 'Влияние изменения климата на биоразнообразие',
            'abstract' => 'Это исследование изучает влияние изменения климата на глобальное биоразнообразие, с акцентом на исчезающие виды в тропических регионах.',
            'keywords' => 'изменение климата, биоразнообразие, исчезающие виды, экология',
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
            'status' => 'published',
        ]);

        $article3 = Article::create([
            'user_id' => $author1->id,
            'title' => 'Квантовые вычисления: текущее состояние и перспективы',
            'abstract' => 'В этой статье представлен обзор текущего состояния квантовых вычислений и обсуждаются потенциальные будущие разработки в этой области.',
            'keywords' => 'квантовые вычисления, квантовая физика, вычислительные технологии',
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies t  nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
            'status' => 'under_review',
        ]);

        // Создать комментарии
        Comment::create([
            'user_id' => $reader->id,
            'article_id' => $article1->id,
            'content' => 'Отличная статья! Я нашел раздел о нейронных сетях особенно познавательным.',
        ]);

        Comment::create([
            'user_id' => $author2->id,
            'article_id' => $article1->id,
            'content' => 'Интересный взгляд на приложения глубокого обучения. Рассматривали ли вы этические последствия?',
        ]);

        Comment::create([
            'user_id' => $reader->id,
            'article_id' => $article2->id,
            'content' => 'Это исследование имеет решающее значение для понимания долгосрочных последствий изменения климата.',
        ]);

        // Создать оценки
        Rating::create([
            'user_id' => $reader->id,
            'article_id' => $article1->id,
            'rating' => 5,
        ]);

        Rating::create([
            'user_id' => $author2->id,
            'article_id' => $article1->id,
            'rating' => 4,
        ]);

        Rating::create([
            'user_id' => $reader->id,
            'article_id' => $article2->id,
            'rating' => 5,
        ]);

        Rating::create([
            'user_id' => $author1->id,
            'article_id' => $article2->id,
            'rating' => 4,
        ]);
    }
}
