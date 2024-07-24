import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import CallApi from '../../../service/CallAPI';

const PriceSetupPage = ({ typeCourtId }) => {
  const [priceList, setPriceList] = useState([]);
  const [newPrice, setNewPrice] = useState({ start: '', end: '', price: '' });

const typeCourtId1 = 1

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CallApi(`/api/host/type-court/${typeCourtId1}/price`, "get", {}, {});
      const data = response.data.map(item => ({
        start: new Date(item.startTime).toISOString().substring(11, 16),
        end: new Date(item.endTime).toISOString().substring(11, 16),
        price: item.price
      }));
      setPriceList(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrice({ ...newPrice, [name]: value });
  };

  const handleAddPrice = () => {
    const { start, end, price } = newPrice;
    if (start && end && price) {
      setPriceList([...priceList, { start, end, price: parseInt(price) }]);
      setNewPrice({ start: '', end: '', price: '' });
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleDeletePrice = (index) => {
    const updatedPriceList = priceList.filter((_, i) => i !== index);
    setPriceList(updatedPriceList);
  };

  const handleSavePrices = async () => {
    try {
      const formattedPriceList = priceList.map(item => ({
        startTime: `1970-01-01T${item.start}:00.000Z`,  // You can adjust the date part as needed
        endTime: `1970-01-01T${item.end}:00.000Z`,      // You can adjust the date part as needed
        price: item.price
      }));
      const response = await CallApi(
        `/api/host/type-court/${typeCourtId}/set-prices`,
        "post",
        { priceList: formattedPriceList },
        {}
      );
      toast.success("Prices saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Set Prices for Time Slots
      </Typography>
      <Box component="form" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Start Time"
          type="time"
          name="start"
          value={newPrice.start}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="End Time"
          type="time"
          name="end"
          value={newPrice.end}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          name="price"
          value={newPrice.price}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddPrice}>
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Price (VND)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    type="time"
                    value={item.start}
                    onChange={(e) => {
                      const updatedPriceList = [...priceList];
                      updatedPriceList[index].start = e.target.value;
                      setPriceList(updatedPriceList);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={item.end}
                    onChange={(e) => {
                      const updatedPriceList = [...priceList];
                      updatedPriceList[index].end = e.target.value;
                      setPriceList(updatedPriceList);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const updatedPriceList = [...priceList];
                      updatedPriceList[index].price = parseInt(e.target.value);
                      setPriceList(updatedPriceList);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeletePrice(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleSavePrices} sx={{ mt: 2 }}>
        Save Prices
      </Button>
    </Box>
  );
};

export default PriceSetupPage;
