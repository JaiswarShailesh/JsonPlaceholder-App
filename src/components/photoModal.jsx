import React from "react";
import { Button, Modal } from "react-bootstrap";

const PhotoModal = ({ show, handleClose, photo }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{photo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={photo.url} alt="" className="img-fluid" />
      </Modal.Body>
    </Modal>
  );
};

export default PhotoModal;
