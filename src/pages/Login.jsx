import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(firebase.isLoggedIn){
        //navigate to home page
        navigate("/");
    }
  },[firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to stop the page from refreshing
    console.log('Loging up the user');
    const result = await firebase.loginUserWithEmailAndPassword(email, password);
    console.log('Login Successful',result);
  };

  console.log(firebase);

  return (
    <div className="container mt-5">
        <h1> Welcome to Bookmate <br></br></h1>
        <h2>Login Here</h2><br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="info">Sign In with Google</Button>
    </div>
  );
};

export default LoginPage;
