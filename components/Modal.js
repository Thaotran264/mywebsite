import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteItem } from '../store/actions';
import { DataContext } from '../store/globalState';

const ModalComponent = () => {
  const { state, dispatch } = useContext(DataContext);
  const { show, setShow } = useContext(DataContext);
  const { modal } = state;
  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'));
    dispatch({ type: 'ADD_MODAL', payload: {} });
    setShow(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant="dark" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
