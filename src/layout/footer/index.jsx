import React from 'react';
import './styles.css';

export default function Footer() {
    return (
        <div id="footer">
            <div className="footer-wrapper flex flex-col justify-center items-center p-4 py-28 bg-blue-500">
                <div className="footer-logo-wrap w-1/4 flex justify-center items-center">
                    <div className="footer-logo w-36">
                        <img src="/images/logo/logo.png" alt="Logo" className="img logo" />
                    </div>
                </div>

                <div className="text-white text-lg font-semibold text-center mt-4">
                    © {new Date().getFullYear()} Be Well. All rights reserved
                </div>
            </div>
        </div>
    );
}
