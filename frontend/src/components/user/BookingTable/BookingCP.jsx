/* eslint-disable react/prop-types */

import { Dialog, Grid } from "@mui/material";

import BookingLeftCP from "./BookingLeftCP";
import BookingRightCP from "./BookingRightCP";

const BookingTable = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <Grid container>
        <Grid item xs={6}>
          <BookingLeftCP />
        </Grid>
        <Grid item xs={6}>
          <BookingRightCP />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default BookingTable;
