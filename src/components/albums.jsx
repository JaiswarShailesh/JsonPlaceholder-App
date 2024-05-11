import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "holderjs";

const Albums = () => {
  const { id: userId } = useParams();
  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    setAlbums(data);
    console.log(data);
  };

  useEffect(() => {
    getAlbums();
  }, [userId]);

  return (
    <>
      <Container>
        <Row className="my-3">
          {albums.map((album) => (
            <Col md={3} key={album.id} className="mt-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`https://picsum.photos/200/200?random=${album.id}`}
                />
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>

                  <Link to={`/photos/${album.id}`}>
                    <Button variant="primary" size="sm">
                      View Photos
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Albums;
