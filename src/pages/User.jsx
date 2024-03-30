import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterPage from "./Register";
import image3 from  './image3.jpg';
import styled from "styled-components";
import { Button } from "react-bootstrap";

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

const Text = styled.h1`
  font-size: 80px;
  color: white;
  text-align: center;
`;

// const Button = styled.div`
  
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

console.log(image3);
const UserPage = () => {
    return (
        <div className="container mt-4" style={{
            backgroundColor : "#FFF9F9	",
            borderRadius: "20px",
        }}>
            {/* <center>
            <h1> Welcome to BookMate!</h1>
            </center> */}
            
            <Container>
            <Row>
                <Col>
                    <ImageContainer>
                        <ImageBackground src={image3} alt="background" style={{borderRadius:"30px"}} />
                        <TextWrapper>
                            <Text>
                                Welcome Back!<br></br>
                                <Button href="/login" style={{
                                    width:"200px",
                                    height:"40px", 
                                    borderRadius:"15px"
                                }} >Login</Button>
                            </Text> 
                            <br></br>   
                        </TextWrapper>
                    </ImageContainer>
                </Col>
                <Col>
                    <div className="m-5">
                        <RegisterPage/>
                    </div>
                    
                </Col>
            </Row>
            
            </Container>
        </div>
        
    );
};

export default UserPage;