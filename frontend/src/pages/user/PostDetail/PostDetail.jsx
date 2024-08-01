import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetailCP from "../../../components/user/Post/PostDetailCP.jsx";
import CallApi from "../../../service/CallAPI.jsx";
import { toast } from "react-toastify";
import Loading from "../../../components/common/Loading.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    setIsLoading(true);
    try {
      const response = await CallApi(`/api/post/${id}`, "get");
      console.log("🚀 ========= response:", response);
      setPost(response?.data);
      setIsLoading(false);
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
        {isLoading ? <Loading /> : <PostDetailCP post={post} postId={id} />}
      </Box>
    </Box>
  );
};

export default PostDetail;
