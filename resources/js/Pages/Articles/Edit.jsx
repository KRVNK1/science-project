import { Head, Link, useForm } from "@inertiajs/react"
import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import InputError from "@/Components/InputError"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import TextArea from "@/Components/TextArea"

export default function Edit({ auth, article }) {
    const { data, setData, put, processing, errors } = useForm({
        title: article.title || "",
        keywords: article.keywords || "",
        abstract: article.abstract || "",
        content: article.content || "",
        references: article.references || "",
    })

    const submit = (e) => {
        e.preventDefault();
        put(`/articles/${article.id}`)
    }

    return (
        <>
            <Head title="Редактирование статьи" />

            <Header auth={auth} />

            <div className="max-w-4xl mx-auto p-4 my-14 sm:p-6 lg:p-8 border rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Редактирование статьи</h1>
                    
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Заголовок статьи</label>
                        <TextInput
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ключевые слова (через запятую)</label>
                        <TextInput
                            value={data.keywords}
                            onChange={(e) => setData("keywords", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.keywords} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Аннотация (краткий текст статьи)</label>
                        <TextArea
                            value={data.abstract}
                            onChange={(e) => setData("abstract", e.target.value)}
                            className="mt-1 block w-full"
                            rows={4}
                        />
                        <InputError message={errors.abstract} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Текст статьи</label>
                        <TextArea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="mt-1 block w-full"
                            rows={8}
                            required
                        />
                        <InputError message={errors.content} className="mt-2" />
                    </div>

                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700">Список литературы (через запятую)</label>
                        <TextArea
                            value={data.references}
                            onChange={(e) => setData("references", e.target.value)}
                            className="mt-1 block w-full"
                            rows={3}
                            placeholder="Например: Иванов И.И. Статья о науке, 2023; Петров П.П. Научные исследования, 2022"
                        />
                        <InputError message={errors.references} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-3 items-center">
                        <Link href={`/articles/${article.id}`} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Отмена
                        </Link>
                        <PrimaryButton disabled={processing}>Сохранить изменения</PrimaryButton>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    )
}
