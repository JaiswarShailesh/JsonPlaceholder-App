import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditCommentForm = ({ close, show, postId, addComment }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          postId,
          name,
          email,
          body: comment,
        }
      );
      close();
      console.log(response);
      addComment(response.data);
    } catch (error) {
      console.log(`You have an error ${error}`);
    }
  };

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
              type="email"
              placeholder="Enter name"
              autoFocus
              onChange={(e) => handleNameInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              onChange={(e) => handleEmailInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => handleCommentInput(e)}
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

export default EditCommentForm;
