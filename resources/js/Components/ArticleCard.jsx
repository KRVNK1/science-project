import { Link } from "@inertiajs/react"
import Star from "../../../public/img/svg/Star.svg"
import Comment from "../../../public/img/svg/CommentSvg.svg"

export default function ArticleCard({ article }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 h-full flex flex-col">

            <h3 className="text-lg font-bold mb-1 ">
                <Link className="hover:text-blue-600" href={`/articles/${article.id}`}>{article.title}</Link>
            </h3>


            <div className="text-xs text-gray-600 mb-2">Авторы: {article.user ? article.user.name : "Неизвестно"}</div>

            <p className="text-gray-700 mb-4 flex-grow line-clamp-3">{article.abstract}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {article.keywords.map((keyword, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-xl">
                        {keyword}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <Link href={`/articles/${article.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
                    Полный текст статьи
                </Link>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center text-yellow-500 gap-1">
                        <img src={Star} alt="Star"/>
                        <span className="ml-1 text-sm">{
                            article.average_rating !== null && !isNaN(article.average_rating) 
                                ? Number(article.average_rating).toFixed(2) : 'Нет оценок'
                        }

                        </span>
                    </div>

                    <div className="flex items-center text-gray-500">
                        <img src={Comment} alt="Comment" />
                        <span className="ml-1 text-sm">{article.comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
