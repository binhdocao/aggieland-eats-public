import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const restaurantData = { name, address, cuisine };

    try {
      const response = await fetch('http://localhost:4000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // FIGURE OUT WHAT I WANT TO PUT HERE
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the restaurant.');
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    window.location.reload();
    setShowModal(false);
  };

  return (
    <div>
      <Button onClick={handleShowModal} variant="outline-primary">
        Create New Restaurant
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="description">
              <Form.Label>cuisine type</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </Form.Group>
            <div className="mt-5 d-flex justify-content-center">
              <Button block size="lg" type="submit">
                Add Restaurant
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-3 text-center">{message}</div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRestaurant;
