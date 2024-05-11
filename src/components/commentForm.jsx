import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CommentForm = ({
  show,
  close,
  name,
  email,
  comment,

  handleNameInput,
  handleEmailInput,
  handleCommentInput,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>What's in your mind?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              autoFocus
              value={name}
              onChange={(e) => handleNameInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              onChange={(e) => handleEmailInput(e)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => handleCommentInput(e)}
              value={comment}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentForm;
