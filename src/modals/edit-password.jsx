import { Modal, Button } from 'flowbite-react';
import React from 'react';
import axiosInstance from '../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import { formToJSON } from 'axios';
import TextField from '../components/text-field';

export default function ChangePasswordForm({ data, onSuccess, setChangePassword }) {
    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const p_el = document.getElementById('password');
        const cp_el = document.getElementById('confirm_password');

        if (p_el) p_el.value = '';
        if (cp_el) cp_el.value = '';
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = formToJSON(e.target);

        if (formData?.password !== formData?.confirm_password) {
            return NotificationManager.warning("Passwords doesn't match");
        }

        setIsProcessing(true);
        axiosInstance
            .patch(`/users/update/password/${data._id}`, formData)
            .then((result) => {
                if (result?.data?.status === 'success') {
                    NotificationManager.success('User password changed');
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
            <Modal.Body className="w-full flex items-center flex-col gap-4">
                <div className="w-full max-w-sm">
                    <TextField
                        name="password"
                        id="password"
                        label="Password"
                        placeholder="Password"
                        required
                        type="password"
                        defaultValue=""
                    />
                </div>
                <div className="w-full max-w-sm">
                    <TextField
                        name="confirm_password"
                        id="confirm_password"
                        label="Confirm Password"
                        placeholder="Password"
                        required
                        type="password"
                        defaultValue=""
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3">
                <Button onClick={() => setChangePassword(false)} outline disabled={isProcessing}>
                    Edit Details
                </Button>

                <Button disabled={isProcessing} isProcessing={isProcessing} type="submit">
                    Change
                </Button>
            </Modal.Footer>
        </form>
    );
}
