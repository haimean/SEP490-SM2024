import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const sampleAttributes = [
  { id: 1, name: "Chiều dài" },
  { id: 2, name: "Chiều rộng" },
  { id: 3, name: "Thảm" },
  { id: 4, name: "Lưới" },
  { id: 5, name: "Đèn" },
];

const attributeKeys = {
  "Chiều dài": [
    { id: 30, name: "13.4m" },
    { id: 31, name: "14m" },
  ],
  "Chiều rộng": [
    { id: 32, name: "6.1m" },
    { id: 33, name: "7m" },
  ],
  Thảm: [
    { id: 34, name: "Thảm Enlio A-23150" },
    { id: 35, name: "Thảm Zeno" },
  ],
  Lưới: [
    { id: 36, name: "Lưới cầu lông Hải Yến" },
    { id: 37, name: "Lưới cầu lông Yonex" },
  ],
  Đèn: [
    { id: 38, name: "Đèn pha LED" },
    { id: 39, name: "Đèn cao áp" },
  ],
};

const TypeCourtForm = ({ open, onClose, typeCourt }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedAttributeKey, setSelectedAttributeKey] = useState("");

  useEffect(() => {
    if (typeCourt) {
      setFormData({
        name: typeCourt.name,
        description: typeCourt.description,
        image: typeCourt.image,
        attributes: typeCourt.attributes,
      });
    }
  }, [typeCourt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddAttribute = () => {
    const newAttribute = {
      id: Date.now(),
      attributeKey: sampleAttributes.find(
        (attr) => attr.name === selectedAttribute
      ),
      value: selectedAttributeKey,
    };
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, newAttribute],
    }));
    setSelectedAttribute("");
    setSelectedAttributeKey("");
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
        <Typography variant="h6" component="h2">
          {typeCourt ? "Sửa kiểu sân" : "Thêm kiểu sân"}
        </Typography>
        <form className="space-y-4 mt-4">
          <TextField
            fullWidth
            label="Tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Box className="space-y-4">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 w-32 object-cover"
              />
            )}
          </Box>
          <Box className="flex space-x-4">
            <FormControl fullWidth>
              <InputLabel>Attribute</InputLabel>
              <Select
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value)}
              >
                {sampleAttributes.map((attribute) => (
                  <MenuItem key={attribute.id} value={attribute.name}>
                    {attribute.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Attribute Key</InputLabel>
              <Select
                value={selectedAttributeKey}
                onChange={(e) => setSelectedAttributeKey(e.target.value)}
                disabled={!selectedAttribute}
              >
                {(attributeKeys[selectedAttribute] || []).map((key) => (
                  <MenuItem key={key.id} value={key.name}>
                    {key.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleAddAttribute}
              disabled={!selectedAttributeKey}
            >
              Thêm
            </Button>
          </Box>
          <Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.attributes.map((attr) => (
                  <TableRow key={attr.id}>
                    <TableCell>{attr.attributeKey.name}</TableCell>
                    <TableCell>{attr.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box className="flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Lưu
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              className="ml-2"
            >
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TypeCourtForm;
