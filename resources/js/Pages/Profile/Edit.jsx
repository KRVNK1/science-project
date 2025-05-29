import { Head, Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function Edit({ mustVerifyEmail, status, user }) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        put("/profile/update");
    };

    return (
        <>
            <Head title="Редактирование профиля" />

            <div className="min-h-screen flex flex-col">
                <Header auth={{ user }} />

                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-6">
                                Редактирование профиля
                            </h1>

                            {status && (
                                <div className="mb-4 text-green-600 text-sm">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Имя
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {mustVerifyEmail &&
                                    user.email_verified_at === null && (
                                        <div className="mb-4 text-sm text-gray-600">
                                            Ваш email не подтвержден.
                                            Пожалуйста, проверьте вашу почту для
                                            подтверждения.
                                            <Link
                                                href="/email/verification-notification"
                                                method="post"
                                                as="button"
                                                className="ml-1 text-blue-600 hover:text-blue-500"
                                            >
                                                Отправить повторно
                                            </Link>
                                        </div>
                                    )}

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href="/profile"
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Отмена
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Сохранение..."
                                            : "Сохранить"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
