import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import {useNavigate} from 'react-router-dom';

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    firebase.logoutFunction();
    navigate("/register")
  }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">BookMate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <div className="">
            {
              firebase.isLoggedIn ? (
                <Nav.Link href="/book/list">Add Listing</Nav.Link>
              ) : (
                <></>
              )
            }
            </div>
            {/* <Nav.Link href="/book/list">Add Listing</Nav.Link> */}
            {/* <Nav.Link href="/book/orders">Orders</Nav.Link> */}
          </Nav>
          <div className="">
            {
              firebase.isLoggedIn ? (
                // <Button onClick={firebase.logoutFunction}>Logout</Button>
                <Button onClick={handleLogout}>Logout</Button>

              ) : (
                <Button href="/user" style={{ marginRight: "10px" }}>Signin</Button>
              )
            }
        </div>
        </Container>
      </Navbar>
      
      
    );
};

export default MyNavbar;