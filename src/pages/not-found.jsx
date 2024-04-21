import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center w-full h-full">
            <div className="flex flex-col justify-center items-center space-x-1 text-sm text-gray-700 gap-10">
                <img className="w-full max-w-sm" src="/images/not-found.png" alt="Page Not Found" />

                <div>Page Not Found</div>

                <Link
                    className="btn rounded-md py-2 px-3 text-xl font-bold bg-blue-500 text-white"
                    to="/">
                    Back To Home
                </Link>
            </div>
        </div>
    );
}
