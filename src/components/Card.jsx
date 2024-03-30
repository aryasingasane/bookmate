import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {

    const [url, setURL] = useState(null);
    const firebase = useFirebase();
    const navigate = useNavigate();

    useEffect( ()=>{
        firebase.getImageURL(props.imgURL).then(url=>setURL(url));
    } ,[]);
    console.log(props);
    
  return (
    <Card style={{ width: "18rem", margin:'15px' }}>
      <div style={{ height: "450px", overflow: "hidden" }}>
        <Card.Img variant="top" src={url} style={{ objectFit: "cover", height: "450px" }} />
      </div>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text> 
          Book by {props.author}
          <br />
          {/* Sold By: {props.userEmail}
          Trope: {props.trope} */}
        </Card.Text>
        <Button onClick={e => navigate(`/book/view/${props.id}`)} variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
