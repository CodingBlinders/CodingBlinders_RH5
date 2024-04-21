import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { csv } from 'd3-fetch';

export default function CountrySelect({ defaultValue, ...props }) {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        setLoading(true);
        // Fetch the CSV file and parse it
        csv('/images/cities.csv').then((data) => {
            const citiesData = data.map((city) => ({
                label: city.name_en,
                value: {
                    name: city.name_en,
                    latitude: parseFloat(city.latitude),
                    longitude: parseFloat(city.longitude),
                },
            }));
            setCountries(citiesData);
            if (defaultValue) {
                setSelectedCountry(citiesData.find((city) => city.value.name === defaultValue));
            } else {
                setSelectedCountry(citiesData[0]); // Set default value to the first city
            }
        }).finally(() => setLoading(false));
    }, [defaultValue]);

    return (
        <div>
            <Select
                className="w-full max-w-sm"
                isLoading={loading}
                options={countries}
                value={selectedCountry}
                onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                {...props}
            />
            <input type="hidden" name="latitude" value={selectedCountry?.value?.latitude} />
            <input type="hidden" name="longitude" value={selectedCountry?.value?.longitude} />
            <input type="hidden" name="city" value={selectedCountry?.value?.name} />
        </div>

    );
}
