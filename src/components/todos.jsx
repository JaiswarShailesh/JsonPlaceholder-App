import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Todos = () => {
  const { id: userId } = useParams();
  const [todos, setTodos] = useState([]);

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
      if (response.status === 200) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      }
    } catch (error) {
      console.log(`You have an error ${error}`);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
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
                      <Button variant="info" size="sm">
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
      </Row>
    </Container>
  );
};

export default Todos;
