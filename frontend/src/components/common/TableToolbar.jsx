import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Iconify from "../admin/common/iconify/iconify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

export default function TableToolbar({
  inputPlaceholder,
  filterName,
  onFilterName,
  filterLevel,
  onFilterLevel,
  onCloseModal,
}) {
  const levels = ["Yếu", "Trung bình", "Khá"];

  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder={inputPlaceholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <Select
          value={filterLevel}
          onChange={onFilterLevel}
          displayEmpty
          input={<OutlinedInput />}
          sx={{ width: 150 }}
        >
          <MenuItem value="">Trình độ</MenuItem>
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </div>
      <IconButton onClick={onCloseModal}>
        <CloseIcon />
      </IconButton>
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  inputPlaceholder: PropTypes.string,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterLevel: PropTypes.string,
  onFilterLevel: PropTypes.func,
  onCloseModal: PropTypes.func,
};
