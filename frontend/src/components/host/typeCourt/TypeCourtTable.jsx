import React, { useState } from 'react';
import {
  Box, Button, IconButton, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal,
  Typography, Select, MenuItem, TextField
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const typeCourtData = [
  {
    id: 1,
    name: 'Cầu lông',
    description: 'Sân cầu lông tiêu chuẩn',
    image: 'https://example.com/image1.jpg',
    attributes: [
      { id: 20, attributeKey: { id: 30, name: 'Chiều dài' }, value: { id: 40, name: '13.4m' } },
      { id: 21, attributeKey: { id: 31, name: 'Chiều rộng' }, value: { id: 42, name: '6.1m' } }
    ]
  },
  {
    id: 2,
    name: 'Bóng đá',
    description: 'Sân bóng đá mini',
    image: 'https://example.com/image2.jpg',
    attributes: [
      { id: 22, attributeKey: { id: 30, name: 'Chiều dài' }, value: { id: 40, name: '13.4m' } },
      { id: 23, attributeKey: { id: 31, name: 'Chiều rộng' }, value: { id: 42, name: '6.1m' } }
    ]
  }
];

const attributeData = [
  { id: 30, name: 'Chiều dài', values: [{ id: 40, name: '13.4m' }, { id: 41, name: '14m' }] },
  { id: 31, name: 'Chiều rộng', values: [{ id: 42, name: '6.1m' }, { id: 43, name: '7m' }] },
  { id: 33, name: 'Thảm', values: [{ id: 44, name: 'Thảm Enlio A-23150' }, { id: 45, name: 'Thảm bình thường' }] }
];

const ImageModal = ({ isOpen, onClose, image }) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
      <img src={image} alt="Selected" className="max-h-screen max-w-screen" />
    </Box>
  </Modal>
);

const AttributeTable = ({
  typeCourt, attributeDataState, openRows, editRows, isCreatingValue, newValue, getDefaultAttributeValue,
  getAttributeKeys, handleAttributeChange, handleCreateValue, handleSaveNewValue, handleCancelEdit,
  handleSaveRow, handleEditRow, handleDeleteRow, setNewValue, isCreatingAttribute, handleCreateAttribute,
  handleSaveNewAttribute, handleCancelNewAttribute, newAttribute, setNewAttribute
}) => (
  <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
      <Collapse in={openRows[typeCourt.id]} timeout="auto" unmountOnExit>
        <Box margin={1}>
          <Table size="small" aria-label="purchases" className="table-fixed">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="w-1/3">Thuộc Tính</TableCell>
                <TableCell align="center" className="w-1/3">Giá Trị</TableCell>
                <TableCell align="center" className="w-1/3">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    Hành Động
                    <Button variant="contained" color="primary" onClick={handleCreateAttribute}>
                      Tạo mới thuộc tính
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeCourt.attributes.map(attribute => (
                <React.Fragment key={attribute.id}>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {editRows[`${typeCourt.id}-${attribute.id}`] ? (
                        <Select
                          value={getDefaultAttributeValue(typeCourt.id, attribute.id, 'attributeKey')}
                          onChange={e => handleAttributeChange(typeCourt.id, attribute.id, 'attributeKey', {
                            id: e.target.value,
                            name: attributeDataState.find(attr => attr.id === e.target.value).name
                          })}
                          className="w-36"
                        >
                          {attributeDataState.map(attr => (
                            <MenuItem key={attr.id} value={attr.id}>
                              {attr.name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        attribute.attributeKey.name
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editRows[`${typeCourt.id}-${attribute.id}`] ? (
                        <>
                          <Select
                            value={getDefaultAttributeValue(typeCourt.id, attribute.id, 'value')}
                            onChange={e => {
                              if (e.target.value === 'new') {
                                handleCreateValue(attribute.id);
                              } else {
                                handleAttributeChange(typeCourt.id, attribute.id, 'value', {
                                  id: e.target.value,
                                  name: getAttributeKeys(attribute.attributeKey.name).find(val => val.id === e.target.value).name
                                });
                              }
                            }}
                            className="w-36"
                          >
                            <MenuItem value="new">Tạo mới</MenuItem>
                            {getAttributeKeys(attribute.attributeKey.name).map(key => (
                              <MenuItem key={key.id} value={key.id}>
                                {key.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {isCreatingValue[attribute.id] && (
                            <Box mt={1}>
                              <TextField
                                value={newValue}
                                onChange={e => setNewValue(e.target.value)}
                                placeholder="Giá trị mới"
                                className="w-36"
                              />
                            </Box>
                          )}
                        </>
                      ) : (
                        attribute.value.name
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editRows[`${typeCourt.id}-${attribute.id}`] ? (
                        <>
                          {isCreatingValue[attribute.id] ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSaveNewValue(typeCourt.id, attribute.id, attribute.attributeKey.id)}
                              >
                                Lưu
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleCancelEdit(typeCourt.id, attribute.id)}
                              >
                                Hủy
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSaveRow(typeCourt.id, attribute.id)}
                              >
                                Xác nhận
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleCancelEdit(typeCourt.id, attribute.id)}
                              >
                                Hủy
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditRow(typeCourt.id, attribute.id)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteRow(typeCourt.id, attribute.id)}
                          >
                            Xóa
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              {isCreatingAttribute && (
                <TableRow>
                  <TableCell align="center">
                    <TextField
                      value={newAttribute.name}
                      onChange={e => setNewAttribute(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Thuộc tính mới"
                      className="w-36"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      value={newAttribute.value}
                      onChange={e => setNewAttribute(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="Giá trị mới"
                      className="w-36"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveNewAttribute(typeCourt.id)}
                    >
                      Lưu
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelNewAttribute}
                    >
                      Hủy
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
);

const TypeCourtTable = () => {
  const [typeCourts, setTypeCourts] = useState(typeCourtData);
  const [attributeDataState, setAttributeDataState] = useState(attributeData);
  const [openRows, setOpenRows] = useState({});
  const [editRows, setEditRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTypeCourt, setCurrentTypeCourt] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isCreatingValue, setIsCreatingValue] = useState({});
  const [isCreatingAttribute, setIsCreatingAttribute] = useState(false);
  const [newAttribute, setNewAttribute] = useState({ name: '', value: '' });

  const handleToggleRow = id => setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
  const handleOpenModal = typeCourt => { setCurrentTypeCourt(typeCourt); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setCurrentTypeCourt(null); };
  const handleImageClick = image => { setCurrentImage(image); setIsImageModalOpen(true); };
  const handleCloseImageModal = () => { setIsImageModalOpen(false); setCurrentImage(''); };
  const handleAttributeChange = (typeCourtId, attrId, field, value) => setTypeCourts(prev =>
    prev.map(typeCourt =>
      typeCourt.id === typeCourtId
        ? { ...typeCourt, attributes: typeCourt.attributes.map(attr => attr.id === attrId ? { ...attr, [field]: value } : attr) }
        : typeCourt));
  const handleEditRow = (typeCourtId, attrId) => setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attrId}`]: true }));
  const handleSaveRow = (typeCourtId, attrId) => setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));
  const handleCancelEdit = (typeCourtId, attrId) => {
    setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));
    setIsCreatingValue(prev => ({ ...prev, [attrId]: false }));
    setNewValue('');
  };
  const handleCreateValue = attrId => setIsCreatingValue(prev => ({ ...prev, [attrId]: true }));
  const handleSaveNewValue = (typeCourtId, attrId, attributeKeyId) => {
    const newValueId = Math.max(...attributeDataState.flatMap(attr => attr.values).map(v => v.id)) + 1;
    setAttributeDataState(attributeDataState.map(attr => attr.id === attributeKeyId ? { ...attr, values: [...attr.values, { id: newValueId, name: newValue }] } : attr));
    setTypeCourts(typeCourts.map(tc => tc.id === typeCourtId ? { ...tc, attributes: tc.attributes.map(attr => attr.id === attrId ? { ...attr, value: { id: newValueId, name: newValue } } : attr) } : tc));
    setNewValue('');
    setIsCreatingValue(prev => ({ ...prev, [attrId]: false }));
  };
  const handleCreateAttribute = () => setIsCreatingAttribute(true);
  const handleSaveNewAttribute = typeCourtId => {
    const newAttributeId = Math.max(...attributeDataState.map(attr => attr.id)) + 1;
    const newValueId = Math.max(...attributeDataState.flatMap(attr => attr.values).map(v => v.id)) + 1;
    setAttributeDataState([...attributeDataState, { id: newAttributeId, name: newAttribute.name, values: [{ id: newValueId, name: newAttribute.value }] }]);
    setTypeCourts(typeCourts.map(tc => tc.id === typeCourtId ? { ...tc, attributes: [...tc.attributes, { id: newAttributeId, attributeKey: { id: newAttributeId, name: newAttribute.name }, value: { id: newValueId, name: newAttribute.value } }] } : tc));
    setNewAttribute({ name: '', value: '' });
    setIsCreatingAttribute(false);
  };
  const handleCancelNewAttribute = () => { setIsCreatingAttribute(false); setNewAttribute({ name: '', value: '' }); };
  const handleDeleteRow = (typeCourtId, attrId) => setTypeCourts(typeCourts.map(tc => tc.id === typeCourtId ? { ...tc, attributes: tc.attributes.filter(attr => attr.id !== attrId) } : tc));
  const getAttributeKeys = attributeKeyName => attributeDataState.find(attr => attr.name === attributeKeyName)?.values || [];
  const getDefaultAttributeValue = (typeCourtId, attrId, field) => typeCourts.find(tc => tc.id === typeCourtId)?.attributes.find(attr => attr.id === attrId)?.[field]?.id || '';

  return (
    <Box className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Quản Lý Loại Sân</h1>
      <Box className="flex justify-end mb-4">
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Thêm Loại Sân
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className="table-fixed">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="w-1/4">Tên</TableCell>
              <TableCell align="center" className="w-1/4">Mô Tả</TableCell>
              <TableCell align="center" className="w-1/4">Ảnh</TableCell>
              <TableCell align="center" className="w-1/4">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeCourts.map(typeCourt => (
              <React.Fragment key={typeCourt.id}>
                <TableRow>
                  <TableCell align="center">{typeCourt.name}</TableCell>
                  <TableCell align="center">{typeCourt.description}</TableCell>
                  <TableCell align="center">
                    <img src={typeCourt.image} alt={typeCourt.name} className="h-16 w-16 object-cover cursor-pointer mx-auto" onClick={() => handleImageClick(typeCourt.image)} />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(typeCourt)}>Sửa</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteRow(typeCourt.id)}>Xóa</Button>
                    <IconButton onClick={() => handleToggleRow(typeCourt.id)}>{openRows[typeCourt.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
                  </TableCell>
                </TableRow>
                <AttributeTable
                  typeCourt={typeCourt}
                  attributeDataState={attributeDataState}
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
                />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} image={currentImage} />
    </Box>
  );
};

export default TypeCourtTable;
