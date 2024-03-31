import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import {useNavigate, Link} from 'react-router-dom';

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    firebase.logoutFunction();
    navigate("/register")
  }
    return (
      <>
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Link to="/" style={{textDecoration:"none"}}>
        <Navbar.Brand >BookMate</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" style={{textDecoration:"none"}}> 
            <Nav.Link href="/">Home</Nav.Link>
            </Link>
            <div className="">
             {
              firebase.isLoggedIn ? ( 
                <>
                <Link to="/book/list" style={{textDecoration:"none"}}>
                <Nav.Link href="/book/list">Add Listing</Nav.Link>
                </Link>
                </>
              ) : (
                <></>
              )
            }
            </div>
          </Nav>
          <div className="">
             {
               firebase.isLoggedIn ? (
                 <Button onClick={handleLogout}>Logout</Button>
               ) : (
                 <Button href="/user" style={{ marginRight: "10px" }}>Signin</Button>
               )
             }
         </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr />
    </>
      
    );
};

export default MyNavbar;