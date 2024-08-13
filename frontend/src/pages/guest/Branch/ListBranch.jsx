import { useEffect, useState } from "react";
import CardComponent from "../../../components/host/CardComponent";
import { Box, Button, Grid } from "@mui/material";
import FilterCp from "../../../components/host/FilterCp";
import CallApi from "../../../service/CallAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useDialogConfirm from "../../../hooks/useDialogConfirm";
import BaseBox from "../../common/BaseBox";
const ListBranch = () => {
  const [listBranch, setListBranch] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    time: "",
  });
  const role = localStorage.getItem("userRole");
  const { openDialog, DialogComponent } = useDialogConfirm();

  const fetchBranchList = async () => {
    try {
      const apiUrl = role === "HOST" ? "/api/host/branches" : "/api/branches";
      const response = await CallApi(apiUrl, "get");
      setListBranch(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch list branch ERROR: " +
          error.response?.data?.error
      );
    }
  };
  useEffect(() => {
    fetchBranchList();
  }, [role]);

  const getFilteredAndSortedBranches = () => {
    let filteredBranches = [...listBranch];
    // Sắp xếp theo thời gian mở cửa
    if (filters.time) {
      filteredBranches.sort((a, b) => {
        const timeA = a.openingHours.split("-")[0].trim();
        const timeB = b.openingHours.split("-")[0].trim();
        if (filters.time === "earliest") {
          return timeA.localeCompare(timeB);
        } else {
          return timeB.localeCompare(timeA);
        }
      });
    }

    return filteredBranches;
  };

  const filterOptions = [
    {
      name: "time",
      label: "Thời gian mở cửa",
      options: [
        { value: "earliest", label: "Sớm nhất" },
        { value: "latest", label: "Muộn nhất" },
      ],
      onChange: (value) => handleFilterChange("time", value),
    },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const isFilterApplied = () => {
    return filters.area !== "" || filters.time !== "";
  };
  const handleDeleteBranch = async (id) => {
    openDialog("Bạn có chắc chắn muốn xóa cơ sở này không?", async () => {
      try {
        await CallApi(`/api/host/branches/branch-delete/${id}`, "put");
        fetchBranchList();
        toast.success("Đã xóa cơ sở thành công");
      } catch (error) {
        console.log(
          "=============== delete branch ERROR: " + error.response?.data?.error
        );
        toast.error("Có lỗi xảy ra khi xóa cơ sở");
      }
    });
  };

  const branchesDisplay = isFilterApplied()
    ? getFilteredAndSortedBranches()
    : listBranch;

  return (
    <BaseBox title="Danh sách cơ sở">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <FilterCp filters={filterOptions} />
        {role == "HOST" && (
          <Link to="/host/create-branch" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Tạo cơ sở
            </Button>
          </Link>
        )}
      </Box>

      <Grid container spacing={3}>
        {branchesDisplay.map((item) => (
          <Grid item xs={12} md={6} key={item?.id}>
            <CardComponent
              name={item?.name}
              location={item?.address?.districts}
              time={item?.openingHours}
              image={item?.image}
              role={role}
              branch={item}
              id={item?.id}
              isAccept={item?.isAccept}
              onDeleteBranch={handleDeleteBranch}
            />
          </Grid>
        ))}
      </Grid>
      <DialogComponent />
    </BaseBox>
  );
};

export default ListBranch;
