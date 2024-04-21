import React from 'react';
import axiosInstance from '../../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import LoadingScreen from '../../components/loading-screen';
// import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import MapComp from './MapComp';

export default function Heatmap() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const fetchData = (search = '') => {
        axiosInstance
            .get('/heatmap/all', { params: { search } })
            .then((result) => {
                if (result?.data?.data) setData(result?.data?.data);
            })
            .catch((error) => {
                console.log(error);
                NotificationManager.error(
                    error?.response?.data?.message || error.message || 'Error message'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div id="stories" className="">

            <div className="hero-section flex mb-8 mt-8">
                <div className="left w-1/2 text-center">
                    <h2 className='pb-3 xl:text-4xl text-3xl font-bold text-gray-500 max-w-md mx-auto'>
                        19 Patients reported in the last 72 hours in this area
                    </h2>

                    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto mt-16">
                        <table className="w-full text-sm leading-5 text-center text-gray-600">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 font-medium">Disease</th>
                                    <th className="py-3 px-4 font-medium ">No of Patients</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 px-4 font-medium">Feaver</td>
                                    <td className="py-3 px-4">240</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="py-3 px-4 font-medium">Cold and Flu</td>
                                    <td className="py-3 px-4">12</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="right map flex-grow h-[80vh] me-8 overflow-hidden rounded-2xl">
                    <MapComp data={data} />
                </div>

            </div>

        </div>
    );
}
