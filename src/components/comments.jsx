import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CommentForm from "./commentForm";

const Comments = () => {
  const { id: postId } = useParams();
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [editComment, setEditComment] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        (comment) => comment.id != commentId
      );
      setComments(newComments);

      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );

      console.log(response);
    } catch (error) {
      console.log(`You have an error ${error}`);
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
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    console.log(commentToEdit);
    setEditComment(commentToEdit);
    handleShow();
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
        <Button variant="primary my-3" onClick={handleShow}>
          Add new comment
        </Button>
      </Container>
      <CommentForm
        show={show}
        close={handleClose}
        open={handleShow}
        postId={postId}
        addComment={addComment}
        editComment={editComment}
        showEditComment={showEditComment}
      />
    </>
  );
};

export default Comments;
