import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TodoForm from "./todoForm";
import { toast } from "react-toastify";

const Todos = () => {
  const { id: userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState("");

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [modalTitle, setModalTitle] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      );
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.log(`You have an error ${error}`);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleCheck = async (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );

    try {
      const { data } = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
          completed: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(`You have an error ${error}`);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`
      );
      if (response.status === 200 && response.status < 300) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        toast.success("Deleted successfully!");
      } else {
        throw new Error("Failed to delete the task");
      }
    } catch (error) {
      console.log(`You have an error ${error}`);
      toast.error("Failed to delete the task");
    }
  };

  const showEditForm = (todoToEdit) => {
    handleShow();
    setTodoToEdit(todoToEdit);
    setTitle(todoToEdit.title);
    setStatus(todoToEdit.completed);
    setModalTitle("Update your task");
    console.log(todoToEdit);
  };

  const showForm = () => {
    handleShow();
    setModalTitle("Add a new task");
  };

  const handleStatusSelect = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleTaskEnter = (e) => {
    setTitle(e.target.value);
  };

  const showEditTodo = (todoToEdit) => {
    setTodos((prevTodo) => {
      const updatedTodo = prevTodo.map((todo) =>
        todo.id === todoToEdit.id ? todoToEdit : todo
      );
      return updatedTodo;
    });
    handleClose();
  };

  const handleSubmit = async () => {
    try {
      if (todoToEdit) {
        console.log("status", status);
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${todoToEdit.id}`,
          {
            userId,
            title,
            completed: status,
          }
        );
        showEditTodo(response.data);
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Edited successfully!");
        } else {
          throw new Error("Failed to add comment");
        }
        console.log(response);
        clearAllInputs();
        handleClose();
        setTodoToEdit(null);
      } else {
        console.log("status", status);

        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          {
            userId,
            title,
            completed: status === "false" ? false : true,
          }
        );
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Added successfully!");
        } else {
          throw new Error("Failed to add comment");
        }
        clearAllInputs();
        handleClose();
        console.log(response);
        addTodo(response.data);
      }
    } catch (error) {
      console.log(`You have an error ${error.message}`);
      toast.error("Failed to add comment");
      handleClose();
      clearAllInputs();
    }
  };

  const clearAllInputs = () => {
    setStatus("");
    setTitle("");
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodo) => [newTodo, ...prevTodo]);
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col className="overflow-x-auto">
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Mark Complete</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? "Complete" : "Pending"}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={todo.completed}
                        disabled={todo.completed}
                        onChange={() => handleCheck(todo.id)}
                      />
                    </td>
                    <td>
                      {todo.completed ? (
                        <span>Not allowed</span>
                      ) : (
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => showEditForm(todo)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Button variant="primary my-3" onClick={showForm}>
            Add new task
          </Button>
        </Row>
      </Container>
      <TodoForm
        show={show}
        close={handleClose}
        handleSubmit={handleSubmit}
        handleStatusSelect={handleStatusSelect}
        handleTaskEnter={handleTaskEnter}
        title={title}
        status={status}
        modalTitle={modalTitle}
      />
    </>
  );
};

export default Todos;
