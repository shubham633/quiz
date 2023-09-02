import { formatTime } from '@/src/lib/utils/common';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IBSModal {
    show: boolean,
    setShow: (val: boolean) => void
    handleSuccess: () => void
    timeLeft: number
}
const BSModal = (props: IBSModal) => {
    const { show, setShow, handleSuccess, timeLeft } = props
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure wanted to finish the test?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have time left {formatTime(timeLeft)}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSuccess}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BSModal;