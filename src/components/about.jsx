import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container className="mt-5">
        <h1>About</h1>
        <Row>
          <Col>
            <p>This is an app build with JSONPlaceholder REST Service</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
