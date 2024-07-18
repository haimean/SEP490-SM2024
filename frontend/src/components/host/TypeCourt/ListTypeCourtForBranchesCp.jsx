import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const ListTypeCourtForBranchesCp = ({
  courts,
  typeCourts,
  onCreate,
  onRemove,
  onAddTypeCourt,
}) => {
  return (
    <Box>
      {/* 3 ô input */}

      {/* input name */}

      {/* input typecourtid */}

      {/* button add -> call oncreate */}

      {/* bảng hiện thông tin có icon xóa nhấn icon xóa thì gọi vào onRemove */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên sân </TableCell>
              <TableCell>Kiểu sân </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courts.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.typeCourtId}</TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={onRemove} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListTypeCourtForBranchesCp;
