import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const TodoForm = ({
  show,
  close,
  handleSubmit,
  handleStatusSelect,
  handleTaskEnter,
  title,
  status,
  modalTitle,
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task"
              autoFocus
              onChange={(event) => handleTaskEnter(event)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Current status</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={status}
              onChange={(event) => handleStatusSelect(event)}
            >
              <option value="0">Status</option>
              <option value="true">Complete</option>
              <option value="false">Pending</option>
            </Form.Select>
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

export default TodoForm;
