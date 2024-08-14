/* eslint-disable react/prop-types */
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const PriceTable = ({
  times,
  priceLists,
  editingRows,
  handleInputChange,
  handleConfirmEditPrice,
  handleCancelEditRow,
  handleEditPrice,
  handleDeletePrice,
  handleDeleteAllPrices,
  newRows,
  handleAddPrice,
  handleCancelNewRow,
  setNewRows,
}) => {
  return (
    <Box key={times} sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2">
        {times === "1"
          ? `Giá cho ${times} lần:`
          : `Giá cho ${times} lần trở lên`}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Giờ bắt đầu</TableCell>
              <TableCell>Giờ kết thúc</TableCell>
              <TableCell>Giá (VND)</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceLists[times].map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TimePicker
                    type="time"
                    name="start"
                    value={
                      editingRows[times] && editingRows[times][index]
                        ? editingRows[times][index].start
                        : item.start
                    }
                    onChange={(e) => handleInputChange(e, times, index)}
                    disabled={!editingRows[times] || !editingRows[times][index]}
                    ampm={false}
                  />
                </TableCell>
                <TableCell>
                  <TimePicker
                    type="time"
                    name="end"
                    value={
                      editingRows[times] && editingRows[times][index]
                        ? editingRows[times][index].end
                        : item.end
                    }
                    onChange={(e) => handleInputChange(e, times, index)}
                    disabled={!editingRows[times] || !editingRows[times][index]}
                    ampm={false}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name="price"
                    value={
                      editingRows[times] && editingRows[times][index]
                        ? editingRows[times][index].price
                        : item.price
                    }
                    onChange={(e) => handleInputChange(e, times, index)}
                    disabled={!editingRows[times] || !editingRows[times][index]}
                  />
                </TableCell>
                <TableCell align="right">
                  {editingRows[times] && editingRows[times][index] ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmEditPrice(times, index)}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCancelEditRow(times, index)}
                        sx={{ ml: 2 }}
                      >
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditPrice(times, index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeletePrice(times, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {newRows[times] && (
              <TableRow>
                <TableCell>
                  <TimePicker
                    type="time"
                    name="start"
                    value={newRows[times].start}
                    onChange={(e) => handleInputChange(e, times)}
                    ampm={false}
                  />
                </TableCell>
                <TableCell>
                  <TimePicker
                    type="time"
                    name="end"
                    value={newRows[times].end}
                    onChange={(e) => handleInputChange(e, times)}
                    ampm={false}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name="price"
                    value={newRows[times].price}
                    onChange={(e) => handleInputChange(e, times)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddPrice(times)}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleCancelNewRow(times)}
                    sx={{ ml: 2 }}
                  >
                    Hủy
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!newRows[times] && (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setNewRows({
              ...newRows,
              [times]: { start: "", end: "", price: "" },
            })
          }
          sx={{ mt: 2 }}
        >
          Thêm
        </Button>
      )}
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteAllPrices(times)}
        sx={{ mt: 2, ml: 2 }}
      >
        Xóa tất cả
      </Button>
    </Box>
  );
};

export default PriceTable;
