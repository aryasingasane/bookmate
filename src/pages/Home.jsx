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
    <div className="cotainer m-5">
      {/* <CardGroup> */}
      {/* <Stack direction="horizontal" gap={2}> */}

      <div
        className="container"
        style={{
          backgroundColor: "red",
          height: "maxContent",
          width: "maxContent",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div className="childcontainer" style={{ flex: "33.33%" }}>
          {books.map((book) => (
            <BookCard key={book.id} id={book.id} {...book.data()} />
          ))}
        </div>
      </div>

      {/* </Stack> */}
      {/* </CardGroup> */}
    </div>
  );
};

export default HomePage;
