import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookDetailPage = () => {
  const params = useParams();
  console.log(params);
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);

  const [data, setData] = useState(null);
  console.log(data);
  const [url, setURL] = useState(null);
  const [burl, setBURL] = useState(null);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imgURL = data.imgURL;
      firebase.getImageURL(imgURL).then((url) => setURL(url));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const pdfURL = data.pdfURL;
      firebase.getPdfURL(pdfURL).then((burl) => setBURL(burl));
    }
  }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("Order Placed", result);
  };

  if (data == null) return <h1>Loading....</h1>;

  return (
    <Container>
    <Row>
      <Col>
        <div className="mt-5">
          <img src={url} width="90%" style={{ borderRadius: "20px" }} />
        </div>
      </Col>
      <Col xs={8}>
        <div className="mt-5">
          <h5 className="m-3">Name: {data.name}</h5>
          <h5><p className="m-3">Release Date: {data.rdate}</p>
          <p className="m-3">Author Name: {data.author}</p>
          <p className="m-3">Tropes: {data.trope}</p>
          <p className="m-3">Description: <br></br> <h6 className="m-2"> {data.desc}</h6></p>
          </h5>
          <br></br>
          <h5 className="m-3">Owner Details:</h5>
          <h5><p className="m-3">Email: {data.userEmail}</p></h5>
          <br></br>
          <Button  variant="success">
            Download PDF
          </Button>
        </div>
      </Col>
    </Row>
    
  </Container>
  );
};

export default BookDetailPage;
