import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ImageModal from "./ImageModal";
import NewTypeCourtModal from "./NewTypeCourtModal";
import CallApi from "../../../service/CallAPI";
import { toast } from "react-toastify";
import DialogInfo from "../../common/DialogInfo";
import BaseBox from "../../../pages/common/BaseBox";

const TypeCourtTable = () => {
  const [typeCourts, setTypeCourts] = useState([]);
  const [accountAttributes, setAccountAttributes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTypeCourt, setCurrentTypeCourt] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isOpenDialogInfo, setIsOpenDialogInfo] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");

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
        priceTypeCourt: item.priceTypeCourt,
      }));
      setTypeCourts(transformedData);
    } catch (error) {
      console.log("Error fetching type courts:", error);
    }
  };

  const handleCloseDialogInfo = () => {
    setIsOpenDialogInfo(false);
  };
  const handleOpenDialogInfo = (title) => {
    setTitleDialog(title);
    setIsOpenDialogInfo(true);
  };
  const fetchAccountAttributes = async () => {
    try {
      const result = await CallApi(
        "/api/host/attribute-key-court/account",
        "get"
      );
      setAccountAttributes(result.data);
    } catch (error) {
      console.log("Lỗi khi tìm nạp thuộc tính thông tin thêm ", error);
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
  const fetchApiDelete = async (id) => {
    try {
      await CallApi(`/api/host/type-court/${id}`, "delete");
      await fetchTypeCourts();
    } catch (error) {
      console.log("Lỗi khi tìm nạp thuộc tính thông tin thêm ", error);
    }
  };
  const handleDeleteRow = async (typeCourtId, numberCourt) => {
    if (numberCourt !== 0) {
      handleOpenDialogInfo("Không thể xóa vì đang có sân đấu");
    } else {
      await fetchApiDelete(typeCourtId);

      toast.success("Xóa kiểu sân thành công");
    }
  };

  const handleSaveTypeCourt = async (formData, isEdit, typeCourtId) => {
    try {
      if (isEdit) {
        await CallApi(`/api/host/type-court/${typeCourtId}`, "put", formData);
      } else {
        await CallApi("/api/host/type-court", "post", formData);
      }
      await fetchTypeCourts();
      toast.success(
        isEdit ? "Cập nhật kiểu sân thành công" : "Tạo kiểu sân thành công"
      );
    } catch (error) {
      console.log("Error saving type court:", error);
      toast.error(
        isEdit ? "Cập nhật kiểu sân thất bại" : "Tạo kiểu sân thất bại"
      );
    }
  };
  return (
    <BaseBox title="Quản Lý kiểu sân">
      <Box className="flex justify-end items-center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm kiểu sân
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
              <TableRow key={typeCourt?.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={typeCourt?.image}
                    alt={typeCourt?.name}
                    className="h-16 w-16 object-cover cursor-pointer mx-auto"
                    onClick={() => handleImageClick(typeCourt?.image)}
                  />
                </TableCell>
                <TableCell align="center">{typeCourt?.name}</TableCell>
                <TableCell align="center">{typeCourt?.court?.length}</TableCell>
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
                    onClick={() =>
                      handleDeleteRow(typeCourt?.id, typeCourt?.court.length)
                    }
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpenDialogInfo && (
        <DialogInfo
          handleClose={handleCloseDialogInfo}
          open={isOpenDialogInfo}
          title={titleDialog}
        />
      )}
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
    </BaseBox>
  );
};

export default TypeCourtTable;
