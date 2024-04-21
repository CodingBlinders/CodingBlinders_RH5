import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import 'react-multi-carousel/lib/styles.css';
import axiosInstance from '../../utils/axios-instance';

export default function Home() {
    return (
        <div id="landing">
            <div className="hero-container flex h-[90vh]">
                <div className="left w-1/2 flex justify-center items-center py-10">
                    <div className="hero-text w-1/2">
                        <div className="title font-extrabold pb-3 xl:text-6xl text-3xl text-blue-950 mb-4">
                            We Are Ready to Problems <br />
                            <span className='clip-text'>
                                Help Your Health
                            </span>
                        </div>
                        <p className='font-thing text-lg text-gray-600 opacity-60'>In times like today, your health is very important,
                            especially since the number of COVID-19 cases is
                            increasing day by day, so we are ready to help you
                            with your health consultation</p>
                        <div className="my-12">
                            <Link
                                to="/overview"
                                className="glow px-8 py-4 text-white rounded-full border-2 bg-[#01959F] 
                                border-[#01959F] text-lg hover:bg-white hover:text-[#01959F] transition duration-300 ease-in-out">
                                Lets Get Started
                            </Link>
                        </div>

                        <div className="flex font-extrabold pb-3 text-3xl text-blue-950 text-center">
                            <div className='me-6'>
                                15K+
                                <div className="text-sm text-grey-600 opacity-60">
                                    Active Users
                                </div>
                            </div>
                            <div className=''>
                                98%
                                <div className="text-sm text-grey-600 opacity-60">
                                    Accuracy
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="right flex-grow flex justify-end">
                    <img className='h-full object-contain' src="/images/common/hero-img.png" alt="" />
                </div>
            </div>
        </div>


    );
}
