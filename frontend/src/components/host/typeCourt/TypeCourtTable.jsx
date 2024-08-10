import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  StepIcon,
} from "@mui/material";
import ImageModal from "./ImageModal";
import NewTypeCourtModal from "./NewTypeCourtModal";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import { format } from "date-fns";

const TypeCourtTable = () => {
  const [typeCourts, setTypeCourts] = useState([]);
  const [accountAttributes, setAccountAttributes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTypeCourt, setCurrentTypeCourt] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    fetchTypeCourts();
    fetchAccountAttributes();
  }, []);
  const fetchTypeCourts = async () => {
    try {
      const result = await CallApi("/api/host/type-court", "get");
      const transformedData = result?.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        court: item.court,
        attributes: item.attributeCourt.map((attr) => ({
          id: attr.id,
          attributeKey: {
            id: attr.attributeKeyCourtId,
            name: attr.attributeKeyCourt.name || "",
          },
          value: {
            id: attr.id,
            name: attr.value,
          },
        })),
      }));
      setTypeCourts(transformedData);
    } catch (error) {
      console.log("Error fetching type courts:", error);
    }
  };

  const fetchAccountAttributes = async () => {
    try {
      const result = await CallApi(
        "/api/host/attribute-key-court/account",
        "get"
      );
      setAccountAttributes(result.data);
    } catch (error) {
      console.log("Error fetching account attributes:", error);
    }
  };

  const handleOpenModal = (typeCourt) => {
    setCurrentTypeCourt(typeCourt);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTypeCourt(null);
  };
  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsImageModalOpen(true);
  };
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setCurrentImage("");
  };

  const handleDeleteRow = (typeCourtId, attrId) =>
    setTypeCourts(
      typeCourts.map((tc) =>
        tc.id === typeCourtId
          ? {
              ...tc,
              attributes: tc.attributes.filter((attr) => attr.id !== attrId),
            }
          : tc
      )
    );

  const handleSaveTypeCourt = async (formData, isEdit, typeCourtId) => {
    try {
      if (isEdit) {
        await CallApi(`/api/host/type-court/${typeCourtId}`, "put", formData);
      } else {
        await CallApi("/api/host/type-court", "post", formData);
      }
      await fetchTypeCourts();
      toast.success(
        isEdit ? "Cập nhật loại sân thành công" : "Tạo loại sân thành công"
      );
    } catch (error) {
      console.log("Error saving type court:", error);
      toast.error(
        isEdit ? "Cập nhật loại sân thất bại" : "Tạo loại sân thất bại"
      );
    }
  };
  const steps = [
    "200.000VND",
    "200.000VND",
    "200.000VND",
    "200.000VND",
    "200.000VND",
  ];
  const TimeIcon = () => {
    const currentTime = format(new Date(), "HH:mm");
    return <span>{currentTime}</span>;
  };
  return (
    <Box sx={{ my: 16, mx: 10, minHeight: "100vh", height: "full" }}>
      <Box className="flex justify-between items-center">
        <Typography variant="h4" component="h2" fontWeight={600}>
          Quản Lý Loại Sân
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Loại Sân
        </Button>
      </Box>
      <TableContainer component={Paper} className="mt-4">
        <Table className="table-fixed">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="w-auto">
                Stt
              </TableCell>
              <TableCell align="center" className="w-auto">
                Ảnh
              </TableCell>
              <TableCell align="center" className="w-auto">
                Tên
              </TableCell>
              <TableCell align="center" className="w-auto">
                Số sân
              </TableCell>

              <TableCell align="center" className="w-auto"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeCourts.map((typeCourt, index) => (
              <React.Fragment key={typeCourt.id}>
                <TableRow>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    <img
                      src={typeCourt.image}
                      alt={typeCourt.name}
                      className="h-16 w-16 object-cover cursor-pointer mx-auto"
                      onClick={() => handleImageClick(typeCourt.image)}
                    />
                  </TableCell>
                  <TableCell align="center">{typeCourt.name}</TableCell>
                  <TableCell align="center">
                    {typeCourt?.court.length}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(typeCourt)}
                      sx={{
                        marginRight: "1rem",
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteRow(typeCourt.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h" component="h2" fontWeight={600} className="mt-5">
        Giá cho dưới 3 lần đặt
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Stepper alternativeLabel>
          {steps.map((label, index) => {
            if (index % 2 === 0) {
              return (
                <Step key={label}>
                  <StepLabel StepIconComponent={TimeIcon}></StepLabel>
                </Step>
              );
            } else {
              return (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={() => {
                      return <span>Giá</span>;
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            }
          })}
        </Stepper>
      </Box>

      <NewTypeCourtModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTypeCourt}
        accountAttributes={accountAttributes}
        typeCourt={currentTypeCourt}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={handleCloseImageModal}
        image={currentImage}
      />
    </Box>
  );
};

export default TypeCourtTable;
