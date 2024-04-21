import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectField({ label, options, className }) {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                {label && <InputLabel id="select-label">{label}</InputLabel>}
                <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue}
                    label={label}
                    onChange={handleChange}
                    className={className}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
