import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedDestination({ title, imageUrl }) {
    return (
        <div className="min-h-screen w-1/3 relative">
            <Link
                to=""
                className="z-10 absolute bottom-0 p-8 2xl:p-16 lg:p-12 pt-0 flex items-center text-white text-4xl font-bold">
                <div className="2xl:text-4xl xl:text-3xl sm:text-2xl text-xl">{title}</div>
            </Link>
            <div
                className="z-0 min-h-screen w-full bg-center bg-no-repeat bg-cover relative opacity-70"
                style={{ backgroundImage: `url(${imageUrl})` }}></div>
        </div>
    );
}
