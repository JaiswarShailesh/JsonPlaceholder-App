import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
  const userId = useParams();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId.id}`
    );
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    getPosts();
  }, [userId.id]);

  return (
    <Container>
      <h1 className="mt-4">All Posts</h1>
      <Row>
        <Col>
          <ListGroup as="ol" numbered>
            {posts.map((post) => (
              <ListGroup.Item
                key={post.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{post.title}</div>
                  {post.body}
                </div>
                <Link to={`/comments/${post.id}`}>
                  <Button variant="primary" size="sm">
                    Comments
                  </Button>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
