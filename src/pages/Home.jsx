import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import "../style/Home.scss"


const HomePage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container main ">
      <div className="row sub">
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
