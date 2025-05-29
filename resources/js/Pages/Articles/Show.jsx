import { Head, Link, useForm } from "@inertiajs/react"
import { useState } from "react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import PrimaryButton from "@/Components/PrimaryButton"
import TextArea from "@/Components/TextArea"

export default function Show({ auth, article, canEdit, canDestroy }) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const { data, setData, processing, reset } = useForm({
        content: "",
        rating: 0,
    })

    // Функция для отображения звездного рейтинга
    const renderStars = (count, filled = true, interactive = false) => {
        return Array.from({ length: 5 }, (_, i) => (
            <button
                key={i}
                type={interactive ? "button" : undefined}
                onClick={interactive ? () => setRating(i + 1) : undefined}
                onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
                onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
                className={`text-2xl ${(interactive ? hoverRating || rating : count) > i ? "text-yellow-400" : "text-gray-300"
                    } focus:outline-none`}
            >
                ★
            </button>
        ))
    }

    // Функция для отправки комментария с рейтингом
    const submitComment = (e) => {
        e.preventDefault()

        // Проверяем, что рейтинг выбран
        if (rating === 0) {
            alert("Пожалуйста, выберите рейтинг для статьи")
            return
        }

        // Отправляем комментарий и рейтинг через обычную форму
        const form = document.createElement("form")
        form.method = "POST"
        form.action = `/articles/${article.id}/comments`

        // Добавляем CSRF токен
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
        const csrfInput = document.createElement("input")
        csrfInput.type = "hidden"
        csrfInput.name = "_token"
        csrfInput.value = csrfToken
        form.appendChild(csrfInput)

        // Добавляем содержимое комментария
        const contentInput = document.createElement("input")
        contentInput.type = "hidden"
        contentInput.name = "content"
        contentInput.value = data.content
        form.appendChild(contentInput)

        // Добавляем рейтинг
        const ratingInput = document.createElement("input")
        ratingInput.type = "hidden"
        ratingInput.name = "rating"
        ratingInput.value = rating
        form.appendChild(ratingInput)

        document.body.appendChild(form)
        form.submit()

        // Сбрасываем форму
        reset()
        setRating(0)
    }

    // Функция для удаления комментария
    const deleteComment = (commentId) => {
        if (confirm("Вы уверены, что хотите удалить этот комментарий? Это действие нельзя отменить.")) {
            const form = document.createElement("form")
            form.method = "POST"
            form.action = `/comments/${commentId}`

            // Добавляем CSRF токен
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
            const csrfInput = document.createElement("input")
            csrfInput.type = "hidden"
            csrfInput.name = "_token"
            csrfInput.value = csrfToken
            form.appendChild(csrfInput)

            // Добавляем метод DELETE
            const methodInput = document.createElement("input")
            methodInput.type = "hidden"
            methodInput.name = "_method"
            methodInput.value = "DELETE"
            form.appendChild(methodInput)

            document.body.appendChild(form)
            form.submit()
        }
    }

    // Функция для удаления статьи
    const handleDeleteArticle = () => {
        if (confirm("Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.")) {
            const form = document.createElement("form")
            form.method = "POST"
            form.action = `/articles/${article.id}`

            // Добавляем CSRF токен
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content")
            const csrfInput = document.createElement("input")
            csrfInput.type = "hidden"
            csrfInput.name = "_token"
            csrfInput.value = csrfToken
            form.appendChild(csrfInput)

            // Добавляем метод DELETE
            const methodInput = document.createElement("input")
            methodInput.type = "hidden"
            methodInput.name = "_method"
            methodInput.value = "DELETE"
            form.appendChild(methodInput)

            document.body.appendChild(form)
            form.submit()
        }
    }

    // Форматирование даты комментария
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // Вычисляем количество оценок
    const ratingsCount = article.ratings ? article.ratings.length : 0

    return (
        <>
            <Head title={article.title} />

            <Header auth={auth} />

            <main className="max-w-4xl mx-auto p-4 my-8">
                {/* Хлебные крошки */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/" className="hover:underline">
                        Главная
                    </Link>
                    <span className="mx-1">/</span>
                    <Link href="/articles" className="hover:underline">
                        Статьи
                    </Link>
                    <span className="mx-1">/</span>
                    <span>{article.title}</span>
                </div>

                {/* Заголовок и рейтинг */}
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold">{article.title}</h1>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center">
                            {renderStars(article.average_rating || 0)}
                            {article.average_rating && article.average_rating !== "Нет оценок" ? (
                                <span className="ml-2 text-lg font-medium">
                                    {typeof article.average_rating === "number"
                                        ? article.average_rating.toFixed(1)
                                        : Number.parseFloat(article.average_rating).toFixed(1)}
                                </span>
                            ) : (
                                <span className="ml-2 text-sm text-gray-500">Нет оценок</span>
                            )}
                        </div>
                        {ratingsCount > 0 && (
                            <span className="text-sm text-gray-500 mt-1">
                                {ratingsCount} {ratingsCount === 1 ? "оценка" : ratingsCount < 5 ? "оценки" : "оценок"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Авторы */}
                <div className="mb-4">
                    <p className="text-gray-700">Авторы: {article.user.name}</p>
                </div>

                {/* Ключевые слова */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {article.keywords.split(",").map((keyword, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-xl">
                            {keyword.trim()}
                        </span>
                    ))}
                </div>

                {/* Аннотация */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                    <h2 className="text-xl font-bold mb-4">Аннотация</h2>
                    <p className="text-gray-700">{article.abstract}</p>
                </div>

                {/* Текст статьи */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                    <h2 className="text-xl font-bold mb-4">Текст статьи</h2>
                    <div className="prose max-w-none">
                        {article.content.split("\n").map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Список литературы */}
                {article.references && (
                    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                        <h2 className="text-xl font-bold mb-4">Список литературы</h2>
                        <ul className="list-decimal list-inside space-y-2">
                            {article.references.split(",").map((reference, index) => (
                                <li key={index} className="text-gray-700">
                                    {reference.trim()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {article.status === "published" && (
                    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                        <h2 className="text-xl font-bold mb-4">Комментарии ({article.comments ? article.comments.length : 0})</h2>

                        {/* Форма добавления комментария */}
                        {auth.user && (
                            <form onSubmit={submitComment} className="mb-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Оценка к комментарию:</label>
                                    <div className="flex">{renderStars(0, true, true)}</div>
                                    {rating > 0 && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Вы поставили оценку: {rating} {rating === 1 ? "звезда" : rating < 5 ? "звезды" : "звезд"}
                                        </p>
                                    )}
                                </div>

                                <TextArea
                                    value={data.content}
                                    onChange={(e) => setData("content", e.target.value)}
                                    placeholder="Добавить комментарий"
                                    className="w-full mb-4"
                                    rows={4}
                                    required
                                />
                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>Отправить комментарий</PrimaryButton>
                                </div>
                            </form>
                        )}

                        {/* Список комментариев */}
                        <div className="space-y-6">
                            {article.comments &&
                                article.comments.map((comment) => (
                                    <div key={comment.id} className="border-t pt-4">
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div>
                                                        <h3 className="font-medium">{comment.user.name}</h3>
                                                        <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
                                                    </div>
                                                    <div className="flex">{comment.rating && renderStars(comment.rating)}</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-700">{comment.content}</p>
                                                    {/* Кнопки управления комментарием */}
                                                    {auth.user && (auth.user.id === comment.user_id || auth.user.role === "admin") && (
                                                        <div className="mt-2 flex justify-end">
                                                            <button
                                                                onClick={() => deleteComment(comment.id)}
                                                                className="rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-900"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {(!article.comments || article.comments.length === 0) && (
                                <p className="text-center text-gray-500 py-4">Пока нет комментариев. Будьте первым!</p>
                            )}
                        </div>
                    </div>
                )}


                {/* Кнопки действий */}
                {canEdit && (
                    <div className="flex space-x-4 mt-8">
                        <Link href={`/articles/${article.id}/edit`}>
                            <PrimaryButton>Редактировать статью</PrimaryButton>
                        </Link>

                        {article.status === "draft" && (
                            <Link
                                href={route('articles.submit', article.id)}
                                method="patch"
                                className="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-green-700"
                            >
                                Отправить на проверку
                            </Link>
                        )}

                        {canDestroy && (
                            <button
                                onClick={handleDeleteArticle}
                                className="inline-flex items-center rounded-md border border-transparent 
                                bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest 
                                text-white transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-900"
                            >
                                Удалить статью
                            </button>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}
