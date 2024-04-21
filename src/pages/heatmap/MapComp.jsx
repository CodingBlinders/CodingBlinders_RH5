import React, { useState, useEffect } from 'react';
import {
    GoogleMap, useLoadScript, Marker, HeatmapLayer
} from '@react-google-maps/api';
// import heatDataPoints from './heatmap.json';

const libraries = ['places', 'visualization'];
const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 6.9271,
    lng: 79.8612,
};

{/* <MapComp data={data} /> */}

export default function Heatmap( { data }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_URI,
        libraries,
    });
    const [heatmapData, setHeatmapData] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(new Date());

    let heatDataPoints = data;

    // [
    //     {
    //         "_id": "6624a53c350b80344026c3ce",
    //         "disease": "fever",
    //         "latitude": "7.2184279",
    //         "longitude": "81.8541161",
    //         "city": "Akkaraipattu",
    //         "createdAt": "2024-04-21T05:33:48.715Z",
    //         "updatedAt": "2024-04-21T05:33:48.715Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6624a54e66e9ff47e710d88e",
    //         "disease": "fever",
    //         "latitude": "7.2184279",
    //         "longitude": "81.8541161",
    //         "city": "Akkaraipattu",
    //         "createdAt": "2024-04-21T05:34:06.814Z",
    //         "updatedAt": "2024-04-21T05:34:06.814Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6624a56066e9ff47e710d891",
    //         "disease": "fever",
    //         "latitude": "7.2184279",
    //         "longitude": "81.8541161",
    //         "city": "Akkaraipattu",
    //         "createdAt": "2024-04-21T05:34:24.569Z",
    //         "updatedAt": "2024-04-21T05:34:24.569Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6624a5a466e9ff47e710d894",
    //         "disease": "fever",
    //         "latitude": "7.2184279",
    //         "longitude": "81.8541161",
    //         "city": "Akkaraipattu",
    //         "createdAt": "2024-04-21T05:35:32.540Z",
    //         "updatedAt": "2024-04-21T05:35:32.540Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6624a5aa66e9ff47e710d899",
    //         "disease": "fever",
    //         "latitude": "7.2184279",
    //         "longitude": "81.8541161",
    //         "city": "Akkaraipattu",
    //         "createdAt": "2024-04-21T05:35:38.835Z",
    //         "updatedAt": "2024-04-21T05:35:38.835Z",
    //         "__v": 0
    //     }
    // ]

    // console.log(heatDataPoints);
    // return

    useEffect(() => {
        const timer = setInterval(() => {
            // Update current week and filter data accordingly
            setCurrentWeek((prevWeek) => {
                const nextWeek = new Date(prevWeek);
                nextWeek.setDate(nextWeek.getDate() - 1);

                const filteredData = heatDataPoints.filter((point) => new Date(point.createdAt) > nextWeek);

                const newData = filteredData.map((point) => new window.google.maps.LatLng(point.latitude, point.longitude));
                setHeatmapData(newData);

                return nextWeek;
            });

            if (currentWeek < new Date('2024-04-21')) {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    if (loadError)
        return <div>Error loading maps</div>;
    if (!isLoaded)
        return <div>Loading maps</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
        >
            <HeatmapLayer data={heatmapData} />
        </GoogleMap>
    );
};
