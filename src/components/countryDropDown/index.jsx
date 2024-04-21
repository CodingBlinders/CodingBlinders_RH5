import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function CountrySelect({ defaultValue, ...props }) {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch(
            'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=name'
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                if (defaultValue) {
                    setSelectedCountry(data.countries.find((obj) => obj.value === defaultValue));
                } else {
                    setSelectedCountry(data.userSelectValue);
                }
            })
            .finally(() => setLoading(false));
    }, [defaultValue]);

    return (
        <Select
            isLoading={loading}
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            {...props}
        />
    );
}
