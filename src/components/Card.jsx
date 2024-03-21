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
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Price : Rs.{props.price} /- 
          <br></br>
          Sold By: {props.displayName}
        </Card.Text>
        <Button onClick={e => navigate(`/book/view/${props.id}`)} variant="primary">View</Button>
      </Card.Body>
    </Card>

  );
};

export default BookCard;
