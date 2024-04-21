import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ConfirmModal({
    isProcessing = false,
    setOpenModal,
    onConfirm,
    message = 'Are you sure you want to delete this?'
}) {
    return (
        <Modal.Body className="w-full flex items-center flex-col gap-4">
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {message}
                </h3>
                <div className="flex justify-center gap-4">
                    <Button isProcessing={isProcessing} color="failure" onClick={onConfirm}>
                        Yes, I'm sure
                    </Button>
                    <Button
                        disabled={isProcessing}
                        color="gray"
                        onClick={() => setOpenModal(false)}>
                        No, cancel
                    </Button>
                </div>
            </div>
        </Modal.Body>
    );
}
