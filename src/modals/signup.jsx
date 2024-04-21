import { Modal, Button } from 'flowbite-react';
import React from 'react';
import axiosInstance from '../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import { formToJSON } from 'axios';
import TextField from '../components/text-field';

export default function SignUpModal({ onSuccess, onSignIn }) {
    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = formToJSON(e.target);

        if (formData.password !== formData.confirm_password) {
            return NotificationManager.warning("Passwords doesn't match");
        }

        setIsProcessing(true);
        axiosInstance
            .post(`/auth/signup`, formData)
            .then((result) => {
                if (result?.data?.status === 'success') {
                    NotificationManager.success(`Registration successful`);
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
                    <TextField
                        name="name"
                        id="name"
                        placeholder="John"
                        required
                        type="name"
                        label="Name"
                    />
                </div>
                <div className="w-full max-w-sm">
                    <TextField
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        required
                        type="email"
                        label="Email"
                    />
                </div>
                <div className="w-full max-w-sm">
                    <TextField
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        type="password"
                        label="Password"
                    />
                </div>
                <div className="w-full max-w-sm">
                    <TextField
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        required
                        type="password"
                        label="Confirm Password"
                    />
                </div>

                <div className="text-sm w-full text-left font-medium text-gray-500 dark:text-gray-300">
                    Already registered?{' '}
                    <span
                        onClick={onSignIn}
                        className="cursor-pointer text-blue-700 hover:underline dark:text-blue-500">
                        Login
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3">
                <Button className="w-full" isProcessing={isProcessing} type="submit">
                    Sign Up
                </Button>
            </Modal.Footer>
        </form>
    );
}
