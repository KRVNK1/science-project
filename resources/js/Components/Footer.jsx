import { Link } from "@inertiajs/react"
import Logo from "./Logo"

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-8 bg-[#F8F8F8]">
            <div className="container mx-auto px-4 max-md:items-center max-md:justify-center max-md:flex">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-center flex-col">
                        <Logo />
                    </div>

                    <div className="flex items-center flex-col">
                        <ul className="space-y-2 max-md:flex items-center flex-col">
                            <h3 className="font-bold mb-4 uppercase text-sm max-md:text-center">ИНФОРМАЦИЯ</h3>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="text-gray-600 hover:text-blue-600">
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                                    Политика конф.
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center flex-col">
                        <ul className="space-y-2 max-md:flex items-center flex-col">
                            <h3 className="font-bold mb-4 uppercase text-sm max-md:text-center">КОНТАКТЫ</h3>
                            <li className="text-gray-600">Иркутск, Ленина 5А</li>
                            <li className="text-gray-600">(812) 444-33-11</li>
                            <li className="text-gray-600">shop@shop.ru</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
