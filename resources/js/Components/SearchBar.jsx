import { useForm } from "@inertiajs/react";

export default function SearchBar({ searchQuery = "" }) {
    const { data, setData, get } = useForm({
        search: searchQuery || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get("/articles", {
            preserveState: true,
            data: { search: data.search },
        });
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto my-8">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData("search", e.target.value)}
                        placeholder="Поиск по статьям, ключевым словам, авторам"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-e-md"
                    >
                        Найти
                    </button>
                </div>
            </form>
        </div>
    );
}
