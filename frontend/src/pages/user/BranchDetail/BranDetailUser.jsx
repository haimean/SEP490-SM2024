import { Box } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserBranchDetail from "../../../components/user/Branch/UserBranchDetail";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CallApi from "../../../service/CallAPI";

const testImg = "https://via.placeholder.com/200";

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
      const response = await CallApi(
        `/api/branches/${id}`,
        "get",
        {},
        {}
      );
      setBranch(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const map = (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0729529435525!2d105.76647617503149!3d21.02976678061981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454baed2a775d%3A0x47abd3d09006674b!2zxJAuIEzDqiDEkOG7qWMgVGjhu40sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1720488012916!5m2!1svi!2s"
      width="100%"
      height="200"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );

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
            map={map}
            courts={branch.court || []}
            branch={branch}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  );
};

export default BranDetailUser;
