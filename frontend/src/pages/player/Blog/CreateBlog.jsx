import { useForm } from "react-hook-form";
import Form from "../../../components/host/Form";
import Navbar from "../../../layouts/player/Navbar";
import Footer from "../../../layouts/player/Footer";
import { Box } from "@mui/material";

const CreateBlog = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formConfig = [
    {
      name: "blogInfo",
      label: "Thông tin bài viết",
      type: "section",
      required: true,
    },
    {
      name: "title",
      label: "Tiêu đề",
      type: "text",
      required: true,
      gridWidth: 12,
    },
    {
      name: "content",
      label: "Nội dung",
      type: "text",
      required: true,
      gridWidth: 12,
      multiline: true,
      rows: 4,
    },
    {
      name: "image_url",
      label: "Ảnh",
      type: "image",
      required: false,
      gridWidth: 12,
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      required: true,
      gridWidth: 12,
      options: [
        { value: "DRAFT", label: "Bản nháp" },
        { value: "PUBLISHED", label: "Đã xuất bản" },
        { value: "ARCHIVED", label: "Đã lưu trữ" },
      ],
    },
  ];

  const handleCancel = () => {
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar sx={{ flexShrink: 0 }} />
      <Box
        sx={{
          my: 12,
          mx: 10,
          flexGrow: 1,
        }}
      >
        <Form
          formConfig={formConfig}
          onFormSubmit={handleSubmit}
          handleCancel={handleCancel}
          control={control}
          errors={errors}
        />
      </Box>
      <Footer sx={{ flexShrink: 0 }} />
    </Box>
  );
};

export default CreateBlog;
