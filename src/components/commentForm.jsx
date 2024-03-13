import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CommentForm = ({
  open,
  close,
  show,
  postId,
  addComment,
  editComment,
  showEditComment,
}) => {
  const [name, setName] = useState(editComment ? editComment.name : "");
  const [email, setEmail] = useState(editComment ? editComment.email : "");
  const [comment, setComment] = useState(editComment ? editComment.body : "");

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
      if (editComment) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/comments/${editComment.id}`,
          {
            name,
            email,
            body: comment,
          }
        );
        showEditComment(response.data);
        console.log(response);
      } else {
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
      }
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
