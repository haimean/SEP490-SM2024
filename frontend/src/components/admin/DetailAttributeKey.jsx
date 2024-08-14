/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";

const DetailAttributeKey = ({
  detailItem,
  valueList,
  openCreateModal,
  openUpdateModal,
}) => {
  const [filterName, setFilterName] = useState("");

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "value",
      headerName: "Giá trị",
      width: 300,
      renderCell: (params) => params.value,
    },
    {
      field: "isPublic",
      headerName: "Công khai",
      description: "Cột chứa dữ liệu không thể sắp xếp",
      sortable: false,
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Công khai
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Chưa công khai
          </span>
        ),
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      description: "Cột chứa dữ liệu không thể sắp xếp",
      sortable: false,
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Kích hoạt
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Chưa kích hoạt
          </span>
        ),
    },
    {
      field: "action",
      headerName: "Hành động",
      description: "Cột chứa dữ liệu không thể sắp xếp",
      sortable: false,
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          onClick={() => openUpdateModal(params.row.id)}
          className={"text-blue-600"}
        >
          {"SỬA"}
        </Button>
      ),
    },
  ];

  const filteredRows = valueList.filter((row) =>
    row.value.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        my: 4,
        boxShadow: 2,
      }}
    >
      <Paper sx={{ maxWidth: "6xl", width: "100%", p: 5 }}>
        <div className="">
          <Typography variant="h5" align="center" gutterBottom>
            Thông tin chi tiết
          </Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <BadgeIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="body1">
                <Box
                  component="span"
                  sx={{
                    fontWeight: "medium",
                    color: "text.secondary",
                    textTransform: "uppercase",
                    mr: 1,
                  }}
                >
                  Tên:
                </Box>
                {detailItem.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DescriptionIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="body1">
                <Box
                  component="span"
                  sx={{
                    fontWeight: "medium",
                    color: "text.secondary",
                    textTransform: "uppercase",
                    mr: 1,
                  }}
                >
                  Mô tả:
                </Box>
                {detailItem.description}
              </Typography>
            </Box>
          </Paper>
        </div>

        <Box sx={{ mt: 4 }}>
          <div className="flex justify-between mb-4">
            <TextField
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search..."
              variant="outlined"
              size="small"
              className="w-1/3"
            />
            <Button
              onClick={openCreateModal}
              variant="contained"
              color="primary"
            >
              thêm mới
            </Button>
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              disableRowSelectionOnClick
              disableColumnMenu
              hideFooter
              autoHeight
            />
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default DetailAttributeKey;
