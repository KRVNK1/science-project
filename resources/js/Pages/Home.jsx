import { Head, Link } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import SearchBar from "@/Components/SearchBar"
import ArticleCard from "@/Components/ArticleCard"
import card1 from '../../../public/img/card1.png'
import card2 from '../../../public/img/card2.png'
import card3 from '../../../public/img/card3.png'

export default function Home({ auth, sampleArticles, filters }) {
    const stats = [
        { value: 1240, label: "Авторов на платформе" },
        { value: 3500, label: "Опубликованных статей" },
        { value: 4.2, label: "Средний рейтинг" },
    ]

    const steps = [
        {
            icon: (
                <img src={card1} alt="" />
            ),
            title: "Зарегстрируйтесь",
        },
        {
            icon: (
                <img src={card2} alt="" />
            ),
            title: 'Перейдите по вкладке "Ваши статьи"',
        },
        {
            icon: (
                <img src={card3} alt="" />
            ),
            title: "Заполните форму и дождитесь публикации",
        },
    ]

    return (
        <>
            <Head title="Главная - Платформа для научных статей" />

            <div className="min-h-screen flex flex-col">
                <Header auth={auth} />

                <main className="flex-grow">
                    <div className="container mx-auto">
                        <SearchBar initialSearch={filters?.search}/>

                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Последние статьи</h2>
                                <Link href="/articles"
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md text-sm">
                                    Посмотреть все
                                </Link>
                            </div>
                    
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {sampleArticles.map((article) => (
                                    article.status === 'published' && (
                                        <ArticleCard key={article.id} article={article} />
                                    )
                                ))}
                            </div>
                        </div>


                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-8">Начните за 3 шага</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center"
                                    >
                                        <div className="mb-4 text-gray-800">{step.icon}</div>
                                        <h3 className="text-lg font-medium">{step.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-8">Статистика платформы</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center"
                                    >
                                        <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                                        <div className="text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
}
