import React from 'react';
import Modal from 'react-bootstrap/Modal'
import "./style.css"

const DeleteModal = (props) => {
    return <Modal show={props.show} onHide={props.close}>
        
        <Modal.Body>
            <p>
                Are you sure you want to delete this adventure?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn-cancel" onClick={props.close}>Cancel</button>
            <button className="btn-continue" onClick={() => { props.deleteQuest(); props.close() }} >Delete</button>
        </Modal.Footer>
    </Modal>
}

export default DeleteModal;