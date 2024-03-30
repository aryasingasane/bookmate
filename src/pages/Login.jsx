import React, { useState, useEffect }  from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image3 from "./image3.jpg";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const ImageBackground = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 100px;
`;

const Text = styled.h3`
  font-size: 80px;
  color: white;
  text-align: center;
`;

console.log(image3);

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      //navigate to home page
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //to stop the page from refreshing
    console.log("Loging up the user");
    const result = await firebase.loginUserWithEmailAndPassword(
      email,
      password
    );
    console.log("Login Successful", result);
  };

  console.log(firebase);
  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#FFF9F9",
        borderRadius: "20px",
      }}
    >

      <Container>
        <Row>
          <Col>
            <ImageContainer>
              <ImageBackground src={image3} alt="background" style={{borderRadius:"30px"}} />
              <TextWrapper>
                <Text>
                  Welcome Back<br></br>
                  {/* <Button href="/login" style={{
                                    width:"200px",
                                    height:"40px", 
                                    borderRadius:"15px"
                                }} >Login</Button> */}
                  <br></br>
                  <h2>Signin to continue access</h2>
                </Text>
                <br></br>
              </TextWrapper>
            </ImageContainer>
          </Col>

          <Col>
            <div className="container m-5">
                <center>
                    <h1>Login Here</h1>
                </center>
                <br></br>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address: </Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
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
                                }}>Login</Button>
                    </center>
                </Form>

                <center>
                    <h1 className="mt-5 mb-5">OR</h1>
                    <Button onClick={firebase.signinWithGoogle} variant="info">Sign In with Google</Button>
                </center>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
