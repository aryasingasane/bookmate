import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useFirebase } from "../context/Firebase";

const ListingPage = () => {

  const firebase = useFirebase();

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      await firebase.handleCreateNewListing(name,author,price,coverPic);
    };

    return(
        <div className="container mt-5">
        <h2>List your Book</h2><br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicBname">
          <Form.Label>Enter Book Name: </Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAname">
          <Form.Label>Enter Author's Name: </Form.Label>
          <Form.Control
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Author's Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Enter Price: </Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Rs. 1000"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Upload Cover Page of the Book: </Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Listing
        </Button>
      </Form>
    </div>
    );
};

export default ListingPage;