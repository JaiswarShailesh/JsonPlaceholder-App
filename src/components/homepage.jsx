import React from "react";
import Dashboard from "./dashboard";
import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="mt-5 overflow-x-auto">
            <Dashboard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
