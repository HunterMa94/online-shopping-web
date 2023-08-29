import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

export default function PicViewer({ formik, deletePic }) {
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setIdToDelete(index)
        setShow(true)
    };

    const confirmAndDelete = () => {
        deletePic(idToDelete)
        handleClose(false);
        setIdToDelete(null);
    }

    return (
        <>
            {formik.values && formik.values.images ?
                formik.values.images.map((item, index) => (
                    <div key={index}
                        className="pic_block"
                        onClick={() => handleShow(index)}
                        style={{
                            background: `url(${item})`
                        }}></div>
                ))
                : null}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this image?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='danger' onClick={confirmAndDelete}>
                        Delete it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
