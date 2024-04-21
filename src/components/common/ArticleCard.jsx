import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ to, imgSrc, location, date, readTime, title, description }) {
    return (
        <Link
            to={to || '#'}
            className="mb-7 w-full lg:w-1/2 p-4 block text-black transition-transform duration-300 ease-in-out transform hover:translate-y-[-2px] hover:backface-visibility-visible relative">
            <div>
                <img className="aspect-[3/2] object-cover rounded-xl" src={imgSrc} alt="" />
            </div>
            <div className="p-4 ps-1">
                <div className="text-base text-gray-500 w-full flex justify-between items-center pb-2">
                    <div className="w-1/2">{location}</div>
                    <div className="flex justify-between items-center">
                        <div>{date}</div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 mx-2"></div>
                        <div>{readTime}</div>
                    </div>
                </div>
                <div className="2xl:text-3xl text-2xl font-bold pb-2">{title}</div>
                <div className="truncate-3-lines text-lg pb-2">{description}</div>

                <p className=" pt-2 text-blue-500 font-bold absolute bottom-0 flex items-center">
                    Read Full Post
                    <span className="text-2xl transform rotate-45 inline-block ml-2">
                        <i className="bx bx-up-arrow-alt"></i>
                    </span>
                </p>
            </div>
        </Link>
    );
}
