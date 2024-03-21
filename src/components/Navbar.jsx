import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {

  const firebase = useFirebase();
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">BookMate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            <Button onClick={firebase.logoutFunction}>Logout</Button>

          </Nav>
        </Container>
      </Navbar>
    );
};

export default MyNavbar;