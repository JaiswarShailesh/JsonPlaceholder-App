import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommentForm from "./commentForm";
import { toast } from "react-toastify";

const Comments = () => {
  const { id: postId } = useParams();
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [editComment, setEditComment] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const getComments = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    setComments(data);
    console.log(data);
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  const handleDelete = async (commentId) => {
    console.log(commentId);
    try {
      const updatedComments = [...comments];
      const newComments = updatedComments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(newComments);

      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Deleted successfully!");
      } else {
        throw new Error("Failed to add comment");
      }
      console.log(response);
    } catch (error) {
      console.log(`You have an error ${error}`);
      toast.error("Failed to delete comment");
    }
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const showEditComment = (editedComment) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment
      );
      return updatedComments;
    });
    handleClose();
  };

  const handleEdit = (commentId) => {
    console.log(commentId);
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setName(commentToEdit.name);
    setEmail(commentToEdit.email);
    setComment(commentToEdit.body);
    console.log(commentToEdit);
    setEditComment(commentToEdit);
    handleShow();
  };

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
        setEditComment(null);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Edited successfully!");
        } else {
          throw new Error("Failed to add comment");
        }
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
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Added successfully!");
        } else {
          throw new Error("Failed to add comment");
        }
        clearAllInputs();
        handleClose();
        console.log(response);
        addComment(response.data);
      }
    } catch (error) {
      console.log(`You have an error ${error.message}`);
      toast.error("Failed to add comment");
      handleClose();
      clearAllInputs();
    }
  };

  const clearAllInputs = () => {
    setName("");
    setEmail("");
    setComment("");
  };

  const handleNewCommentClick = () => {
    handleShow();
    clearAllInputs();
  };

  return (
    <>
      <Container>
        <h1 className="mt-4">All Comments</h1>
        <Row>
          <Col>
            <ListGroup as="ol" numbered>
              {comments.map((comment) => (
                <ListGroup.Item
                  key={comment.id}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{comment.name}</div>
                    {comment.body}
                    <div className="fw-bold ms-auto">- {comment.email}</div>
                  </div>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(comment.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Button variant="primary my-3" onClick={handleNewCommentClick}>
          Add new comment
        </Button>
      </Container>
      <CommentForm
        show={show}
        close={handleClose}
        name={name}
        email={email}
        comment={comment}
        handleNameInput={handleNameInput}
        handleEmailInput={handleEmailInput}
        handleCommentInput={handleCommentInput}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Comments;
