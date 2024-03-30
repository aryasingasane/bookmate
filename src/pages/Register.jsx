import React, { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
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
    console.log('Signing up the user');
    const result = await firebase.signupUserwithEmailandPassword(email, password);
    console.log('SignUp Successful',result);
  };

  console.log(firebase);

  return (
    <div className="container mt-5">
      <center>
        <h2>Create Account</h2><br></br>
      </center>
        {/* <h1> Welcome to Bookmate <br></br></h1> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <br></br>
        <center>

        <Button variant="primary" type="submit" style={{
                                    width:"200px",
                                    height:"40px", 
                                    borderRadius:"15px"
                                }}>
          Sign Up
        </Button>
        <h2 style={{marginTop:"20px"}}>OR</h2>
        <br></br>
      <Button onClick={firebase.signinWithGoogle} variant="info" style={{
                                    width:"200px",
                                    height:"40px", 
                                    borderRadius:"15px"
                                }}>  Sign In with Google</Button>
        </center>
      </Form>
    </div>
  );
};

export default RegisterPage;
