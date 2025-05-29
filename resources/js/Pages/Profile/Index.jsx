import { Head, Link, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import ProfileTabs from "@/Components/ProfileTabs";
import Achievement from "@/Components/Achievement";
import ArticleCard from "@/Components/ArticleCard";

export default function Index({ auth, articles, articlesForReview, isAdmin }) {
    // Используем данные пользователя из auth
    const user = auth.user;

    const getStatusBadge = (status) => {
        const statusMap = {
            draft: {
                text: "Черновик",
                class: "bg-gray-200 text-gray-800",
            },

            under_review: {
                text: "На проверке",
                class: "bg-yellow-200 text-yellow-800",
            },

            rejected: {
                text: "Отклонено",
                class: "bg-red-200 text-red-800",
            },

            published: {
                text: "Опубликовано",
                class: "bg-green-200 text-green-800",
            },
        };

        const statusInfo = statusMap[status] || {
            text: status,
            class: "bg-gray-200 text-gray-800",
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}
            >
                {statusInfo.text}
            </span>
        );
    };

    const achievements = [
        { id: 1, title: "Опубликовать 10 статей" },
        { id: 2, title: "Опубликовать 10 статей" },
        { id: 3, title: "Опубликовать 10 статей" },
    ];

    // Используем реальные статьи из props вместо статического массива
    const userArticles = articles;

    const favoriteArticles = []; // под вопрсоом

    const tabs = [
        {
            id: "my-articles",
            label: "Мои статьи",
            content: (
                <div className="space-y-6">
                    {userArticles.length > 0 ? (
                        userArticles.map((article) => (
                            <div
                                key={article.id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="mb-2">
                                        {getStatusBadge(article.status)}
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">
                                        {article.title}
                                    </h3>

                                    <div className="text-xs text-gray-600 mb-4">
                                        Автор:{" "}
                                        {article.user
                                            ? article.user.name
                                            : user.name}
                                    </div>

                                    <p className="text-gray-700 mb-4 line-clamp-3">
                                        {article.abstract}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.keywords.map(
                                            (keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-xl"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                        >
                                            Полный текст статьи
                                        </Link>

                                        <div className="flex items-center space-x-4">
                                            {article.average_rating && (
                                                <div className="flex items-center text-yellow-500">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="ml-1">{
                                                        article.average_rating !== null && !isNaN(article.average_rating) 
                                                            ? Number(article.average_rating).toFixed(2) : 'Нет оценок'
                                                        }
                                                    </span>
                                                </div>
                                            )}

                                            {article.comments && (
                                                <div className="flex items-center text-gray-500">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="ml-1">{article.comments.length}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                У вас пока нет статей
                            </p>
                            <Link
                                href="/articles/create"
                                className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                            >
                                Создать статью
                            </Link>
                        </div>
                    )}
                </div>
            ),
        },
        // {
        //     id: "favorites",
        //     label: "Избранное",
        //     content: (
        //         <div className="space-y-6">
        //             {favoriteArticles.length > 0 ? (
        //                 favoriteArticles.map((article) => (
        //                     <ArticleCard key={article.id} article={article} />
        //                 ))
        //             ) : (
        //                 <div className="text-center py-12">
        //                     <p className="text-gray-500">
        //                         У вас пока нет избранных статей
        //                     </p>
        //                 </div>
        //             )}
        //         </div>
        //     ),
        // },
        isAdmin ? { 
            id: "checkArticles",
            label: "Статьи для проверки",
            content: (
                <div className="space-y-6">
                    {articlesForReview.length > 0 ? (
                        articlesForReview.map((article) => (
                            <div
                                key={article.id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="mb-2">
                                        {getStatusBadge(article.status)}
                                        <span className="ml-2 text-xs text-gray-500">
                                            Автор: {article.user?.name}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        {article.abstract}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.keywords.map(
                                            (keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-xl"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                        >
                                            Полный текст статьи
                                        </Link>

                                        <div className="flex space-x-4">
                                            <Link
                                                href={`/articles/${article.id}/approve`}
                                                method="patch"
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                                            >
                                                Одобрить
                                            </Link>
                                            <Link
                                                href={`/articles/${article.id}/reject`}
                                                method="patch"
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                                            >
                                                Отклонить
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                Нет статей для проверки
                            </p>
                        </div>
                    )}
                </div>
            ),
        } : {},
    ];

    return (
        <>
            <Head title="Профиль - Платформа для научных статей" />

            <div className="min-h-screen flex flex-col">
                <Header auth={auth} />
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0"></div>

                                <div className="flex-grow text-center md:text-left">
                                    <h1 className="text-2xl font-bold mb-1">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                        {user.email}
                                    </p>

                                    <Link
                                        href="/profile/edit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm mr-4"
                                    >
                                        Редактировать профиль
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                                    >
                                        Выйти из профиля    
                                    </Link>                                    
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-6">
                                    Достижения
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {achievements.map((achievement) => (
                                        <Achievement
                                            key={achievement.id}
                                            title={achievement.title}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ProfileTabs tabs={tabs} defaultTab="my-articles" />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
