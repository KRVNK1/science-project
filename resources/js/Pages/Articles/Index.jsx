import { Head, Link } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import SearchBar from "@/Components/SearchBar"

export default function Index({ auth, articles, filters }) {

    return (
        <>
            <Head title="Статьи - Платформа для научных статей" />

            <Header auth={auth} />

            <main className="max-w-7xl mx-auto px-4 py-8 min-h-[67vh]">

                <SearchBar initialSearch={filters?.search}/>

                <h1 className="text-3xl font-bold mb-6">Статьи</h1>

                {articles.data && articles.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {articles.data.map((article) => (
                        <div key={article.id} className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col h-full">
                            <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
                                <Link href={`/articles/${article.id}`}>{article.title}</Link>
                            </h2>

                            <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{article.abstract}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.keywords
                                    .split(",")
                                    .slice(0,3)
                                    .map((keyword, index) => (
                                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-xl">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                {article.keywords.split(",").length > 3 && (
                                    <span className="inline-flex text-gray-500 text-xs items-center">+{article.keywords.split(",").length - 3}</span>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center">
                                    <div className="text-sm text-gray-700 mr-4">
                                        Автор: {article.user ? article.user.name : "Неизвестно"}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center text-yellow-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-sm">{
                                            article.average_rating !== null && !isNaN(article.average_rating) 
                                                ? Number(article.average_rating).toFixed(2) : 'Нет оценок'
                                            }
                                        </span>
                                    </div>

                                    {article.comments && (
                                        <div className="flex items-center text-gray-500" title={`${article.comments.length} комментариев`}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="ml-1 text-xs">{article.comments.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)
                 : 
                (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-600">Статей не найдено</h3>
                        <p className="mt-2 text-sm text-gray-500">Попробуйте изменить параметры поиска</p>
                    </div>
                )}
                

                {/* Пагинация */}
                {articles.links && articles.links.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {articles.links.map((link, index) => {
                                // кнопки prev и next
                                if (index === 0 || index === articles.links.length - 1) return null

                                return (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                            } ${!link.url ? "cursor-not-allowed opacity-50" : ""}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            })}
                        </nav>
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}
