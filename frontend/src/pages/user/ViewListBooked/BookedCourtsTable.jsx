import BookedCourtsTable from '../../../components/user/ViewListBooked/BookedCourtsTable.jsx';
import { Container } from '@mui/material';

const BookedCourts = () => {

  return (
    <div>
      <Container className="my-24">
        <BookedCourtsTable />
      </Container>
    </div>
  );
};

export default BookedCourts;
