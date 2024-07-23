import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetailCP from "../../../components/user/Post/PostDetailCP.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import { toast } from "react-toastify";

const PostDetail = () => {
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserEmail = JSON.parse(localStorage.getItem("user"));
    if (storedUserRole) setUserRole(storedUserRole);
    if (storedUserEmail) setUserEmail(storedUserEmail);
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await CallApi(`/api/user/post/${id}`, "get");
      console.log("🚀 ========= response:", response.data);
      setPost(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
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
        <PostDetailCP post={post} postId={id} />
      </Box>
    </Box>
  );
};

export default PostDetail;
