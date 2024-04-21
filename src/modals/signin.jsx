import { Modal, Button } from 'flowbite-react';
import React from 'react';
import axiosInstance from '../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import { formToJSON } from 'axios';
import TextField from '../components/text-field';

export default function SignInModal({ onSuccess, onSignUp }) {
    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = formToJSON(e.target);

        setIsProcessing(true);
        axiosInstance
            .post(`/auth/signin`, formData)
            .then((result) => {
                if (result?.data?.status === 'success') {
                    sessionStorage.setItem('logged-user', result.data?.data?.id);
                    sessionStorage.setItem('is-admin', result.data?.data?.role === 'ADMIN');

                    NotificationManager.success(
                        `Welcome ${result?.data?.data?.name && result?.data?.data?.name}!`
                    );
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

                <div className="text-sm w-full text-left font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <span
                        onClick={onSignUp}
                        className="cursor-pointer text-blue-700 hover:underline dark:text-blue-500">
                        Create account
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3">
                <Button className="w-full" isProcessing={isProcessing} type="submit">
                    Login
                </Button>
            </Modal.Footer>
        </form>
    );
}
