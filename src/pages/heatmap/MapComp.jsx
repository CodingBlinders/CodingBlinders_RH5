// require('dotenv').config();


import React from 'react';
import {
    GoogleMap, useLoadScript, Marker, HeatmapLayer
} from '@react-google-maps/api';

// const dotenv = require('../../.env');

const libraries = ['places', 'visualization'];
const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 37.782,
    lng: -122.447,
};

export default function MapComp() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_URI,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    const heatmapData = [
        new window.google.maps.LatLng(37.782, -122.447),
        new window.google.maps.LatLng(37.782, -122.445),
        new window.google.maps.LatLng(37.782, -122.443),
        new window.google.maps.LatLng(37.782, -122.441),
        new window.google.maps.LatLng(37.782, -122.439),
        new window.google.maps.LatLng(37.782, -122.437),
        new window.google.maps.LatLng(37.782, -122.435),
        new window.google.maps.LatLng(37.785, -122.447),
        new window.google.maps.LatLng(37.785, -122.445),
        new window.google.maps.LatLng(37.785, -122.443),
        new window.google.maps.LatLng(37.785, -122.441),
        new window.google.maps.LatLng(37.785, -122.439),
        new window.google.maps.LatLng(37.785, -122.437),
        new window.google.maps.LatLng(37.785, -122.435)
    ];


    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
        >
            <Marker position={center} />
            <HeatmapLayer data={heatmapData} />
        </GoogleMap>
    );
};