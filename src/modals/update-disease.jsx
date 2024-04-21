import { Modal, Button } from 'flowbite-react';
import React from 'react';
import axiosInstance from '../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import { formToJSON } from 'axios';
import TextField from '../components/text-field';
import CountrySelect from '../components/countryDropDown';

export default function UpdateDiseaseModel({ onSuccess, onSignIn }) {
    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = formToJSON(e.target);
        // remove country from form data
        delete formData.country;

        setIsProcessing(true);
        axiosInstance
            .post(`/heatmap/create`, formData)
            .then((result) => {
                if (result?.data?.status === 'success') {
                    NotificationManager.success(`Data saved successfully`);
                    onSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
                NotificationManager.error(
                    error?.response?.data?.message || error.message || 'Error message'
                );
            })
            .finally(() => {
                setIsProcessing(false);
            });
    };

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <Modal.Body className="max-form-h overflow-y-auto w-full flex items-center flex-col gap-4">
                <div className="w-full max-w-sm">
                    {/* <TextField
                        name="name"
                        id="name"
                        placeholder="John"
                        required
                        type="name"
                        label="Disease Name"
                    /> */}
                    {/* disease name dropdown */}
                    <select name="disease" id="disease" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option value="fever">Fever</option>
                        <option value="cough">Cough</option>
                        <option value="cold">Cold</option>
                        <option value="flu">Flu</option>
                    </select>

                </div>
                <div className="w-full max-w-sm mb-20">
                    <CountrySelect name="country" required />
                </div>

            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3">
                <Button className="w-full" isProcessing={isProcessing} type="submit">
                    Add Report
                </Button>
            </Modal.Footer>
        </form>
    );
}
