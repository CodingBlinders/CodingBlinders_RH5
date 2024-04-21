import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios-instance';
import LoadingScreen from '../../components/loading-screen';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import LineChart from './LineChart';
import LineChartAlt from './LineChartAlt';

import PopUp from '../../modals/popup';
// import axiosInstance from '../../utils/axios-instance';
import UpdateDiseaseModel from '../../modals/update-disease';

export default function Overview() {
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [openDiseaseModal, setOpenDiseaseModal] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        verifyLogin();
        setUserSetting();
    }, []);

    const onDiseaseUpdate = () => {
        setOpenDiseaseModal(true);
    };

    const closeModal = () => {
        setOpenDiseaseModal(false);
    };


    const setUserSetting = () => {
        const logged_user = sessionStorage.getItem('logged-user');

        if (logged_user) {
            axiosInstance
                .get(`/users/${logged_user}`)
                .then((result) => {
                    if (result?.data?.status === 'success') {
                        setUser(result.data?.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    NotificationManager.error(
                        error?.response?.data?.message || error.message || 'Error message'
                    );
                });
        } else if (user?._id) {
            setUser({});
            window.location.assign('/');
        }
    };

    const verifyLogin = (search = '') => {
        axiosInstance
            .get('/auth/checkLogin')
            .then((result) => {
                if (result?.data?.status === 'success') {
                    setLoading(false);
                } else {
                    window.location.assign('/');
                }
            })
            .catch((error) => {
                console.log(error);
                window.location.assign('/');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) <LoadingScreen />;

    const date = moment().format('MMMM DD, YYYY');
    const chartStyle = {
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 5%, transparent 80%)',
    };

    return (
        <div id="overview" className="mb-8">
            <div className="anal-container mx-32">
                <div className="top-banner relative">
                    <div className="w-[70vw] mx-auto rounded-2xl h-[25vh] overflow-hidden">
                        <img src="/images/common/top-banner.jpg" alt="" className='w-full h-full object-cover rounded-2xl overflow-hidden pb-14' />
                    </div>
                    <div className="profile-img absolute -bottom-[20%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                        <img
                            className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 "
                            src={user?.image}
                            alt="Bordered avatar"
                        />
                    </div>
                </div>
                <div className="main-analytics flex mt-8">
                    <div className="left w-1/2">
                        <div className="flex justify-between items-center">
                            <div className="left">
                                <h2 className="text-2xl font-bold text-gray-600">Health Overview</h2>
                                <p className="text-gray-500">As of {date}</p>
                            </div>
                            <div className="right"><div onClick={onDiseaseUpdate}
                                className="cursor-pointer glow px-8 py-4 text-white rounded-full border-2 bg-[#7EA200] 
                                border-[#7EA200] text-lg hover:bg-white hover:text-[#7EA200] transition duration-300 ease-in-out">
                                Update Disease
                            </div></div>
                        </div>

                        <div className="disease-cards flex flex-wrap mt-6 mb-6 justify-evenly items-center">

                            <div className="card-item card-shadow w-[30%] me-2 border border-[#E8E7E7] rounded-lg p-4">
                                <div className="col mb-4 flex justify-between items-center pe-2">
                                    <div className="icon bg-[#F8DEBD] rounded-lg px-3 py-2">
                                        <i className="bx bx-brush text-xl font-bold text-[#E79B38]"></i>
                                    </div>
                                    <div className="font-semibold">Blood Sugar</div>
                                </div>
                                <div className="measurement text-sm text-slate-600 mb-4">
                                    <span className='text-2xl pe-1 text-black'>80</span>mg / dL
                                </div>
                                <div className="bg-[#F8DEBD] py-2 px-3 rounded-xl text-xs inline-block font-semibold">Normal</div>

                                <div className="chartContainer" style={chartStyle}>
                                    <LineChart />
                                </div>
                            </div>

                            <div className="card-item card-shadow w-[30%] me-2 border border-[#E8E7E7] rounded-lg p-4">
                                <div className="col mb-4 flex justify-between items-center pe-2">
                                    <div className="icon bg-[#FBF0F3] rounded-lg px-3 py-2">
                                        <i className="bx bxs-heart text-xl font-bold text-[#CA6B6E]"></i>
                                    </div>
                                    <div className="font-semibold">Blood Sugar</div>
                                </div>
                                <div className="measurement text-sm text-slate-600 mb-4">
                                    <span className='text-2xl pe-1 text-black'>80</span>mg / dL
                                </div>
                                <div className="bg-[#FBF0F3] py-2 px-3 rounded-xl text-xs inline-block font-semibold">Normal</div>

                                <div className="chartContainer" style={chartStyle}>
                                    <LineChart />
                                </div>
                            </div>

                            <div className="card-item card-shadow w-[30%] me-2 border border-[#E8E7E7] rounded-lg p-4">
                                <div className="col mb-4 flex justify-between items-center pe-2">
                                    <div className="icon bg-[#D0FBFF] rounded-lg px-3 py-2">
                                        <i className="bx bxs-droplet text-xl font-bold text-[#478F96]"></i>
                                    </div>
                                    <div className="font-semibold">Blood Sugar</div>
                                </div>
                                <div className="measurement text-sm text-slate-600 mb-4">
                                    <span className='text-2xl pe-1 text-black'>80</span>mg / dL
                                </div>
                                <div className="bg-[#D0FBFF] py-2 px-3 rounded-xl text-xs inline-block font-semibold">Normal</div>

                                <div className="chartContainer" style={chartStyle}>
                                    <LineChart />
                                </div>
                            </div>



                        </div>

                        <div className="sugar-card card-item card-shadow mx-4 me-5 border border-[#E8E7E7] rounded-lg p-4">
                            <div className="chartContainer">
                                <LineChartAlt />
                            </div>
                        </div>
                    </div>
                    <div className="right flex-grow ms-8">
                        <div className="flex justify-between items-center ms-4">
                            <div className="left">
                                <h2 className="text-2xl font-bold text-gray-600">Predictions</h2>
                                <p className="text-gray-500 opacity-0">As of {date}</p>
                            </div>
                            <div className="right hidden"><Link
                                to="/overview"
                                className="glow px-8 py-4 text-white rounded-full border-2 bg-[#7EA200] 
                                border-[#7EA200] text-lg hover:bg-white hover:text-[#7EA200] transition duration-300 ease-in-out">
                                Update Disease
                            </Link></div>
                        </div>

                        <div className="prediction-cards flex flex-wrap mt-6">
                            <div className="card-item border border-[#E8E7E7] rounded-lg card-shadow px-4 py-3 mx-1 my-1">
                                <div className="top-text flex justify-between items-center ">
                                    <div className="text-lg font-medium">Heart<br />Disease</div>
                                    <div className="text-3xl font-bold text-red-700">95%</div>
                                </div>
                                <div className="progress-bar mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                        <div className="bg-gradient-to-r from-red-500 to-red-800 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-item border border-[#E8E7E7] rounded-lg card-shadow px-4 py-3 mx-1 my-1">
                                <div className="top-text flex justify-between items-center ">
                                    <div className="text-lg font-medium">Heart<br />Disease</div>
                                    <div className="text-3xl font-bold text-red-700">95%</div>
                                </div>
                                <div className="progress-bar mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                        <div className="bg-gradient-to-r from-red-500 to-red-800 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-item border border-[#E8E7E7] rounded-lg card-shadow px-4 py-3 mx-1 my-1">
                                <div className="top-text flex justify-between items-center ">
                                    <div className="text-lg font-medium">Heart<br />Disease</div>
                                    <div className="text-3xl font-bold text-red-700">95%</div>
                                </div>
                                <div className="progress-bar mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                        <div className="bg-gradient-to-r from-red-500 to-red-800 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-item border border-[#E8E7E7] rounded-lg card-shadow px-4 py-3 mx-1 my-1">
                                <div className="top-text flex justify-between items-center ">
                                    <div className="text-lg font-medium">Heart<br />Disease</div>
                                    <div className="text-3xl font-bold text-red-700">95%</div>
                                </div>
                                <div className="progress-bar mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                        <div className="bg-gradient-to-r from-red-500 to-red-800 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <PopUp
                size="lg"
                title={'Update Disease Report'}
                openModal={openDiseaseModal}
                setOpenModal={setOpenDiseaseModal}>
                <UpdateDiseaseModel
                    onSuccess={closeModal}
                    setOpenModal={setOpenDiseaseModal}
                />
            </PopUp>
        </div>
    );
};