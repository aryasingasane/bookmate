import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
  const params = useParams();
  console.log(params);
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  console.log(data);
  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imgURL = data.imgURL;
      firebase.getImageURL(imgURL).then((url) => setURL(url));
    }
  }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("Order Placed", result);
  };

  if (data == null) return <h1>Loading....</h1>;

  return (
    <div className="container mt-5">
      
      <img src={url} width="40%" style={{ borderRadius: "10px" }} />
      <h2>Details:</h2><br></br>
      <h4>Name: {data.name}</h4>
      <h4><p>Price: Rs. {data.price}</p>
      <p>Author Name: {data.author}</p></h4>
      <br></br>
      <h2>Owner Details:</h2><br></br>
      <h4><p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p></h4>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><h2>Qty</h2></Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
      </Form.Group>
      <Button onClick={placeOrder} variant="success">
        Buy Now
      </Button>
    </div>
  );
};

export default BookDetailPage;
