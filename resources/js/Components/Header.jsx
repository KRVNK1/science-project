import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Logo from "./Logo";
import ProfileSvg from "../../../public/img/svg/User.svg";
import LoginSvg from "../../../public/img/svg/Login.svg";

export default function Header({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="border-b border-gray-200 bg-[#F8F8F8]">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Логотип */}
                <Logo />

                {/* Десктопное меню (скрывается на мобильных) */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        href="/top-articles"
                        className="text-gray-900 hover:text-blue-600 font-medium"
                    >
                        Топ статей
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-900 hover:text-blue-600 font-medium"
                    >
                        О нас
                    </Link>
                    <Link
                        href="/my-articles"
                        className="text-gray-900 hover:text-blue-600 font-medium"
                    >
                        Ваши статьи
                    </Link>
                </div>

                {/* Кнопка профиля/входа (скрывается на мобильных) */}
                <div className="hidden md:block">
                    {auth?.user ? (
                        <Link
                            href="/profile"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                            <img src={ProfileSvg} alt="ProfileSvg" className="pr-2"/>
                            Профиль
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                            <img src={LoginSvg} alt="LoginSvg" className="pr-2"/>
                            Войти
                        </Link>
                    )}
                </div>

                {/* Кнопка мобильного меню */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                        <svg
                            className="h-10 w-10"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                               <div className=""></div>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Мобильное меню (появляется только на маленьких экранах) */}
            <Transition
                show={mobileMenuOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/top-articles"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        >
                            Топ статей
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        >
                            О нас
                        </Link>
                        <Link
                            href="/my-articles"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        >
                            Ваши статьи
                        </Link>
                        {auth?.user ? (
                            <Link
                                href="/profile"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            >
                                Профиль
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            >
                                Войти
                            </Link>
                        )}
                    </div>
                </div>
            </Transition>
        </nav>
    );
}
