import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ImageModal from "./ImageModal";
import AttributeTable from "./AttributeTable";
import NewTypeCourtModal from "./NewTypeCourtModal";
import CallApi from "../../../service/CallAPI";

const TypeCourtTable = () => {
  const [typeCourts, setTypeCourts] = useState([]);
  const [accountAttributes, setAccountAttributes] = useState([]);
  const [typeCourtAttributes, setTypeCourtAttributes] = useState({});
  const [openRows, setOpenRows] = useState({});
  const [editRows, setEditRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTypeCourt, setCurrentTypeCourt] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isCreatingValue, setIsCreatingValue] = useState({});
  const [isCreatingAttribute, setIsCreatingAttribute] = useState(false);
  const [newAttribute, setNewAttribute] = useState({ name: "", value: "" });

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

  const fetchTypeCourtAttributes = async (attributeKeyCourtId) => {
    try {
      const result = await CallApi(
        `/api/host/attribute-key-court/${attributeKeyCourtId}`,
        "get"
      );
      setTypeCourtAttributes((prev) => ({
        ...prev,
        [attributeKeyCourtId]: result.data.attributeCourt,
      }));
    } catch (error) {
      console.log("Error fetching type court attributes:", error);
    }
  };

  const handleToggleRow = (id) =>
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
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

  const handleAttributeChange = async (typeCourtId, attrId, field, value) => {
    if (field === "attributeKey") {
      await fetchTypeCourtAttributes(value.id);
    }
    setTypeCourts((prev) =>
      prev.map((typeCourt) =>
        typeCourt.id === typeCourtId
          ? {
              ...typeCourt,
              attributes: typeCourt.attributes.map((attr) =>
                attr.id === attrId ? { ...attr, [field]: value } : attr
              ),
            }
          : typeCourt
      )
    );
  };

  const handleEditRow = async (typeCourtId, attribute) => {
    setEditRows((prev) => ({
      ...prev,
      [`${typeCourtId}-${attribute.id}`]: true,
    }));
    await fetchTypeCourtAttributes(attribute.attributeKey.id);
  };

  const handleSaveRow = (typeCourtId, attrId) =>
    setEditRows((prev) => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));

  const handleCancelEdit = (typeCourtId, attrId) => {
    setEditRows((prev) => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));
    setIsCreatingValue((prev) => ({ ...prev, [attrId]: false }));
    setNewValue("");
  };

  const handleCreateValue = (attrId) =>
    setIsCreatingValue((prev) => ({ ...prev, [attrId]: true }));

  const handleSaveNewValue = (typeCourtId, attrId, attributeKeyId) => {
    const newValueId =
      Math.max(
        ...accountAttributes.flatMap((attr) => attr.values).map((v) => v.id)
      ) + 1;
    setAccountAttributes(
      accountAttributes.map((attr) =>
        attr.id === attributeKeyId
          ? {
              ...attr,
              values: [...attr.values, { id: newValueId, name: newValue }],
            }
          : attr
      )
    );
    setTypeCourts(
      typeCourts.map((tc) =>
        tc.id === typeCourtId
          ? {
              ...tc,
              attributes: tc.attributes.map((attr) =>
                attr.id === attrId
                  ? { ...attr, value: { id: newValueId, name: newValue } }
                  : attr
              ),
            }
          : tc
      )
    );
    setNewValue("");
    setIsCreatingValue((prev) => ({ ...prev, [attrId]: false }));
  };

  const handleCreateAttribute = () => setIsCreatingAttribute(true);

  const handleSaveNewAttribute = (typeCourtId) => {
    const newAttributeId =
      Math.max(...accountAttributes.map((attr) => attr.id)) + 1;
    const newValueId =
      Math.max(
        ...accountAttributes.flatMap((attr) => attr.values).map((v) => v.id)
      ) + 1;
    setAccountAttributes([
      ...accountAttributes,
      {
        id: newAttributeId,
        name: newAttribute.name,
        values: [{ id: newValueId, name: newAttribute.value }],
      },
    ]);
    setTypeCourts(
      typeCourts.map((tc) =>
        tc.id === typeCourtId
          ? {
              ...tc,
              attributes: [
                ...tc.attributes,
                {
                  id: newAttributeId,
                  attributeKey: { id: newAttributeId, name: newAttribute.name },
                  value: { id: newValueId, name: newAttribute.value },
                },
              ],
            }
          : tc
      )
    );
    setNewAttribute({ name: "", value: "" });
    setIsCreatingAttribute(false);
  };

  const handleCancelNewAttribute = () => {
    setIsCreatingAttribute(false);
    setNewAttribute({ name: "", value: "" });
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

  const getAttributeKeys = (attributeKeyName) =>
    accountAttributes.find((attr) => attr.name === attributeKeyName)?.values ||
    [];

  const getDefaultAttributeValue = (typeCourtId, attrId, field) =>
    typeCourts
      .find((tc) => tc.id === typeCourtId)
      ?.attributes.find((attr) => attr.id === attrId)?.[field]?.id || "";

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
              <TableCell align="center" className="w-1/4">
                Tên
              </TableCell>
              <TableCell align="center" className="w-1/4">
                Mô Tả
              </TableCell>
              <TableCell align="center" className="w-1/4">
                Ảnh
              </TableCell>
              <TableCell align="center" className="w-1/4">
                Hành Động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeCourts.map((typeCourt) => (
              <React.Fragment key={typeCourt.id}>
                <TableRow>
                  <TableCell align="center">{typeCourt.name}</TableCell>
                  <TableCell align="center">{typeCourt.description}</TableCell>
                  <TableCell align="center">
                    <img
                      src={typeCourt.image}
                      alt={typeCourt.name}
                      className="h-16 w-16 object-cover cursor-pointer mx-auto"
                      onClick={() => handleImageClick(typeCourt.image)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(typeCourt)}
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
                    <IconButton onClick={() => handleToggleRow(typeCourt.id)}>
                      {openRows[typeCourt.id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <AttributeTable
                  typeCourt={typeCourt}
                  attributeDataState={accountAttributes}
                  openRows={openRows}
                  editRows={editRows}
                  isCreatingValue={isCreatingValue}
                  newValue={newValue}
                  getDefaultAttributeValue={getDefaultAttributeValue}
                  getAttributeKeys={getAttributeKeys}
                  handleAttributeChange={handleAttributeChange}
                  handleCreateValue={handleCreateValue}
                  handleSaveNewValue={handleSaveNewValue}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveRow={handleSaveRow}
                  handleEditRow={handleEditRow}
                  handleDeleteRow={handleDeleteRow}
                  setNewValue={setNewValue}
                  isCreatingAttribute={isCreatingAttribute}
                  handleCreateAttribute={handleCreateAttribute}
                  handleSaveNewAttribute={handleSaveNewAttribute}
                  handleCancelNewAttribute={handleCancelNewAttribute}
                  newAttribute={newAttribute}
                  setNewAttribute={setNewAttribute}
                  typeCourtAttributes={typeCourtAttributes}
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
