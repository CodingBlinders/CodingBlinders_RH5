import React from 'react';
import PopUp from '../../modals/popup';
import ConfirmModal from '../../modals/confirm';
import axiosInstance from '../../utils/axios-instance';
import { NotificationManager } from 'react-notifications';
import './styles.css';
import { Button } from 'flowbite-react';

export default function AdminCard({ data = {}, onDeleteSuccess }) {
    const [deleteItem, setDeleteItem] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const user = sessionStorage.getItem('logged-user');

    const onDelete = () => {
        setIsDeleting(true);

        axiosInstance
            .delete(`/admins/remove/${deleteItem}`)
            .then((result) => {
                if (result?.data?.status === 'success') {
                    NotificationManager.success('Admin details deleted');
                    onDeleteSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
                NotificationManager.error(
                    error?.response?.data?.message || error.message || 'Error message'
                );
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
            <div className="flex flex-col items-center">
                {data.image ? (
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={data.image}
                        alt="Bonnie image"
                    />
                ) : (
                    <div className="flex justify-center align-middle w-24 h-24 mb-3 relative rounded-full shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
                        <svg
                            className="w-20 h-20 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"></path>
                        </svg>
                    </div>
                )}
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center">
                    {data.name || 'Unknown'}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {data.email || '-'}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <Button
                        disabled={user === data?._id}
                        onClick={() => setDeleteItem(data?._id)}
                        className="inline-flex items-center px-4 py-0 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                    </Button>
                </div>
            </div>

            <PopUp title={'Delete Admin'} openModal={!!deleteItem} setOpenModal={setDeleteItem}>
                <ConfirmModal
                    isProcessing={isDeleting}
                    onConfirm={onDelete}
                    setOpenModal={setDeleteItem}
                />
            </PopUp>
        </div>
    );
}
