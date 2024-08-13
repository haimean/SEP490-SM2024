import { Box, Button, Link, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserBranchDetail from "../../../components/user/Branch/UserBranchDetail";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CallApi from "../../../service/CallAPI";
import { LocationOn } from "@mui/icons-material";
import Map from "../../../components/common/Map";
import Loading from "../../../components/common/Loading";

const BranDetailUser = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState(null); // Khởi tạo branch là null

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await CallApi(`/api/branches/${id}`, "get", {}, {});
      setBranch(response?.data);
      console.log("🚀 ========= response12345:", response?.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
        {branch ? (
          <UserBranchDetail
            title={branch.name}
            image={branch.image}
            description={branch.description}
            map={
              <div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6">Bản đồ</Typography>
                  <Link
                    href={`https://www.google.com/maps?q=${branch?.address?.latitude},${branch?.address?.longitude}&ll=${branch?.address?.latitude},${branch?.address?.longitude}&z=17`}
                    variant="body2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outlined" startIcon={<LocationOn />}>
                      Xem vị trí
                    </Button>
                  </Link>
                </Box>
                <div className="flex justify-center">
                  <Map
                    lat={branch?.address?.latitude || "105.52526950492785"}
                    lng={branch?.address?.longitude || "21.013393218627524"}
                    address={branch?.address?.detail || ""}
                    height={"350px"}
                    width={"350px"}
                  />
                </div>
              </div>
            }
            courts={branch.court || []}
            branch={branch}
          />
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default BranDetailUser;
