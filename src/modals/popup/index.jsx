import { Button, Modal } from 'flowbite-react';

export default function PopUp({
    title,
    openModal,
    setOpenModal,
    children,
    className = '',
    size = undefined
}) {
    return (
        <Modal
            size={size}
            className={className}
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}>
            <Modal.Header>{title}</Modal.Header>
            {children}
        </Modal>
    );
}
