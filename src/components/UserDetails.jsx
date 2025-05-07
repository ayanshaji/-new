import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

const UserDetails = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3004/books') // Adjust if you have a separate route for reservations
      .then(res => res.json())
      .then(data => {
        const reservedBooks = data.filter(book => book.borrowed === true);
        setReservations(reservedBooks);
        console.log('Reserved books:', reservedBooks); // ✅ Debug log
      })
      .catch(err => console.error('Failed to fetch reservations:', err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>User Reservations</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Borrowed By</TableCell>
              <TableCell>Borrow Date</TableCell>
              <TableCell>Return Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((book,index) => (
               <TableRow key={book._id || index}> {/* ✅ Fallback key */}
              
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.borrowedBy}</TableCell>
                <TableCell>{book.borrowDate}</TableCell>
                <TableCell>{book.returnDate || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default UserDetails;
