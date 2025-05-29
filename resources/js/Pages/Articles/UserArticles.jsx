import { Head, Link } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import PrimaryButton from "@/Components/PrimaryButton"

export default function UserArticles({ auth, articles }) {
    // Функция для отображения статуса статьи
    const getStatusBadge = (status) => {
        const statusMap = {
            draft: { text: "Черновик", class: "bg-gray-200 text-gray-800" },
            under_review: { text: "На проверке", class: "bg-yellow-200 text-yellow-800" },
            rejected: { text: "Отклонено", class: "bg-red-200 text-red-800" },
            published: { text: "Опубликовано", class: "bg-green-200 text-green-800" },
        }

        const statusInfo = statusMap[status] || { text: status, class: "bg-gray-200 text-gray-800" }

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>{statusInfo.text}</span>
    }

    return (
        <>
            <Head title="Ваши статьи" />

            <Header auth={auth} />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 my-8 min-h-[60vh]">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Ваши статьи</h1>
                    <Link href="/articles/create">
                        <PrimaryButton>Создать новую статью</PrimaryButton>
                    </Link>
                </div>

                {articles.length > 0 ? (
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold">{article.title}</h2>
                                    {getStatusBadge(article.status)}
                                </div>

                                <p className="text-gray-600 mb-4 line-clamp-3">{article.abstract}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.keywords.split(",").map((keyword, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>

                                {/* {console.log(article)} */}

                                <div className="flex flex-wrap gap-2">
                                    <Link href={`/articles/${article.id}`}>
                                        <PrimaryButton className="bg-blue-500 hover:bg-blue-600">Просмотреть</PrimaryButton>
                                    </Link>

                                    <Link href={`/articles/${article.id}/edit`}>
                                        <PrimaryButton className="bg-gray-500 hover:bg-gray-600">Редактировать</PrimaryButton>
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mx-auto text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h2 className="text-xl font-semibold mb-2">У вас пока нет статей</h2>
                        <p className="text-gray-600 mb-6">
                            Создайте свою первую научную статью и поделитесь своими исследованиями с миром!
                        </p>
                        <Link href="/articles/create">
                            <PrimaryButton className="mx-auto">Создать первую статью</PrimaryButton>
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </>
    )
}
