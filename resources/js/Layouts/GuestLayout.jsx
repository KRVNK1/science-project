import ApplicationLogo from '@/Components/Logo';
import React from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
            <Header />
            <div className="flex min-h-[70vh] flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            
                <div className="mt-6 w-full overflow-hidden bg-white px-8 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}
