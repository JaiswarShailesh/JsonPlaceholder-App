import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PhotoModal from "./photoModal";

const Photos = () => {
  const { id: albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (photo) => {
    setShow(true);
    setCurrentPhoto(photo);
  };

  const getPhotos = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    setPhotos(data);
    console.log(data);
  };

  useEffect(() => {
    getPhotos();
  }, [albumId]);

  return (
    <>
      <Container>
        <Row className="my-3">
          {photos.map((photo) => (
            <Col md={3} key={photo.id} className="mt-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={photo.thumbnailUrl}
                  onClick={() => handleShow(photo)}
                />
                <Card.Body>
                  <Card.Text>{photo.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <PhotoModal
        show={show}
        handleClose={handleClose}
        photo={currentPhoto}
      />
    </>
  );
};

export default Photos;
