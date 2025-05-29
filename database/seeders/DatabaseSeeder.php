<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Создаем 10 пользователей
        $users = User::factory(10)->create();
        $users->each(function ($user) {
            Article::factory(10)->create([
                'user_id' => $user->id
            ]);
        });
        $this->call([
            UserSeeder::class,
        ]);
    }
}
