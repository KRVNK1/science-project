import { Head, useForm } from '@inertiajs/react';
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

export default function Create({auth}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        keywords: '',
        abstract: '',
        content: '',
        references: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'), {
            onSuccess: () => {
                reset(),
                window.location.href = route('articles.user');
            } 
        });
    };


    return (
        <>
            <Head title="Добавление новой статьи" />

            <Header auth={auth}/>

            <div className="max-w-4xl mx-auto p-4 my-14 sm:p-6 lg:p-8 border rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Добавление новой статьи</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Заголовок статьи</label>
                        <TextInput
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ключевые слова (через запятую)</label>
                        <TextInput
                            value={data.keywords}
                            onChange={e => setData('keywords', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.keywords} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Аннотация (краткий текст статьи)</label>
                        <TextArea
                            value={data.abstract}
                            onChange={e => setData('abstract', e.target.value)}
                            className="mt-1 block w-full"
                            rows={4}
                        />
                        <InputError message={errors.abstract} className="mt-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Текст статьи</label>
                        <TextArea
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
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
                            onChange={e => setData('references', e.target.value)}
                            className="mt-1 block w-full"
                            rows={3}
                        />
                        <InputError message={errors.references} className="mt-2" />
                    </div>

                    <div className="flex justify-start">
                        <PrimaryButton disabled={processing}>
                            Опубликовать
                        </PrimaryButton>
                        <p className='font-semibold text-base text-[#797979] pl-4 flex items-center'>(После публикации подождите, пока администратор одобрит статью)</p>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}