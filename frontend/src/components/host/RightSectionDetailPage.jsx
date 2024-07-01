// eslint-disable-next-line no-unused-vars
import React from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const RightSectionDetailPage = () => {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ position: "sticky", top: 100, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Book sân
        </Typography>
        <div className="max-w-sm p-4 border rounded-lg shadow-lg mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              100.000 VNĐ<span className="text-sm font-normal"> / 1h</span>
            </div>
            <div className="flex items-center">
              {/* <StarIcon className="text-orange-400" /> */}
              <span className="ml-1 text-gray-600">
                4.5 <StarIcon className="text-yellow-300" />
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="border p-2 rounded-lg flex items-center justify-between">
              <div className="w-full">
                <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
                  Chọn ca
                </Button>
                <FormControl className="w-full">
                  <InputLabel id="demo-controlled-open-select-label">
                    Ca chơi
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>12h - 2h</MenuItem>
                    <MenuItem value={20}>12h - 2h</MenuItem>
                    <MenuItem value={30}>12h - 2h</MenuItem>
                    <MenuItem value={10}>12h - 2h</MenuItem>
                    <MenuItem value={20}>12h - 2h</MenuItem>
                    <MenuItem value={30}>12h - 2h</MenuItem>
                    <MenuItem value={10}>12h - 2h</MenuItem>
                    <MenuItem value={20}>12h - 2h</MenuItem>
                    <MenuItem value={30}>12h - 2h</MenuItem>
                    <MenuItem value={10}>12h - 2h</MenuItem>
                    <MenuItem value={20}>12h - 2h</MenuItem>
                    <MenuItem value={30}>12h - 2h</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="border p-2 rounded-lg flex items-center justify-between mt-2">
              <div className="text-gray-600">4 Guests</div>
              <div className="text-gray-600">Guests</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <div>100.000 vnđ / 2h</div>
              <div>$357</div>
            </div>
            <div className="flex justify-between mt-2">
              <div>Service charge</div>
              <div>$0</div>
            </div>
            <div className="flex justify-between mt-2 font-bold">
              <div>Total</div>
              <div>$199</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to={"/player/checkout"}>
              <Button variant="contained" color="primary" className="w-full">
                Reserve
              </Button>
            </Link>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default RightSectionDetailPage;
