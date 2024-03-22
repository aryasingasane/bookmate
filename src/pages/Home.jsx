import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Stack from "react-bootstrap/Stack";

const HomePage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container m-5" style={{}}>
      <div
        className="row"
        style={{
          backgroundColor: "#efedf5",
          display: "flex",
          flexWrap: "wrap",
          width:"1400px"
        }}
      >
        {books.map((book) => (
          <div key={book.id} className="col-md-3 mb-3">
            <BookCard id={book.id} {...book.data()} />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default HomePage;
