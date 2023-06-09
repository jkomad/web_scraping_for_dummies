import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, scrapeBooks, selectBooks } from "./booksSlice";
import {
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [fetchedBooks, setFetchedBooks] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks()).then(setFetchedBooks(false));
    if (loading) {
      console.log("loading...");
    }
    setFetchedBooks(false);
  }, [fetchedBooks]);

  const handleClick = () => {
    dispatch(scrapeBooks()).then(setFetchedBooks(true), setLoading(true));
  };

  return (
    <>
      <Container
        align="center"
        style={{
          margin: "10px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        }}
      >
        <Typography variant="h6">Books (Barnes and Noble)</Typography>
        <Button onClick={handleClick}>Fetch Books</Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Rating</TableCell>
                <TableCell align="left">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => {
                return (
                  <TableRow>
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.rating}</TableCell>
                    <TableCell>{book.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Books;
