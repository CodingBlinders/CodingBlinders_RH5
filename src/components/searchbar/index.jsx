import React from 'react';

export default function SearchBar() {
    return (
        <div className="min-h-screen w-full relative bg-white rounded shadow">
            <div className="z-0 min-h-screen w-full bg-center bg-no-repeat bg-cover bg-white relative shadow">
                <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-gray-600">
                    <input
                        type="search"
                        name="serch"
                        placeholder="Search"
                        className="bg-transparent border-2 border-grey h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
