import React, { useState, useEffect } from 'react';
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import ImageModal from './ImageModal';
import AttributeTable from './AttributeTable';
import NewTypeCourtModal from './NewTypeCourtModal';
import CallApi from '../../../service/CallAPI';
import { toast } from 'react-toastify';

const TypeCourtTable = () => {
  const [typeCourts, setTypeCourts] = useState([]);
  const [accountAttributes, setAccountAttributes] = useState([]);
  const [typeCourtAttributes, setTypeCourtAttributes] = useState({});
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

  useEffect(() => {
    fetchTypeCourts();
    fetchAccountAttributes();
  }, []);

  const fetchTypeCourts = async () => {
    try {
      const result = await CallApi('/api/host/type-court', 'get');
      const transformedData = result?.data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        attributes: item.attributeCourt.map(attr => ({
          id: attr.id,
          attributeKey: {
            id: attr.attributeKeyCourtId,
            name: attr.attributeKeyCourt.name || ''
          },
          value: {
            id: attr.id,
            name: attr.value
          }
        }))
      }));
      setTypeCourts(transformedData);
    } catch (error) {
      console.log('Error fetching type courts:', error);
    }
  };

  const fetchAccountAttributes = async () => {
    try {
      const result = await CallApi('/api/host/attribute-key-court/account', 'get');
      setAccountAttributes(result.data);
    } catch (error) {
      console.log('Error fetching account attributes:', error);
    }
  };

  const fetchTypeCourtAttributes = async (attributeKeyCourtId) => {
    try {
      const result = await CallApi(`/api/host/attribute-key-court/${attributeKeyCourtId}`, 'get');
      setTypeCourtAttributes(prev => ({
        ...prev,
        [attributeKeyCourtId]: result.data.attributeCourt
      }));
    } catch (error) {
      console.log('Error fetching type court attributes:', error);
    }
  };

  const handleToggleRow = id => setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
  const handleOpenModal = typeCourt => { setCurrentTypeCourt(typeCourt); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setCurrentTypeCourt(null); };
  const handleImageClick = image => { setCurrentImage(image); setIsImageModalOpen(true); };
  const handleCloseImageModal = () => { setIsImageModalOpen(false); setCurrentImage(''); };

  const handleAttributeChange = async (typeCourtId, attrId, field, value) => {
    if (field === 'attributeKey') {
      await fetchTypeCourtAttributes(value.id);
    }
    setTypeCourts(prev =>
      prev.map(typeCourt =>
        typeCourt.id === typeCourtId
          ? { ...typeCourt, attributes: typeCourt.attributes.map(attr => attr.id === attrId ? { ...attr, [field]: value } : attr) }
          : typeCourt
      )
    );
  };
  

  const handleEditRow = async (typeCourtId, attribute) => {
    setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attribute.id}`]: true }));
    await fetchTypeCourtAttributes(attribute.attributeKey.id);
  };

  const handleSaveRow = async (typeCourtId, attrId) => {
    const attribute = typeCourts.find(tc => tc.id === typeCourtId).attributes.find(attr => attr.id === attrId);
    await CallApi(`/api/host/type-court/${typeCourtId}/attribute/${attrId}/${attribute.value.id}`, 'put');
    setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));
    toast.success('Cập nhật thuộc tính sân thành công');
  };

  const handleCancelEdit = (typeCourtId, attrId) => {
    setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attrId}`]: false }));
    setIsCreatingValue(prev => ({ ...prev, [attrId]: false }));
    setNewValue('');
  };

  const handleCreateValue = attrId => setIsCreatingValue(prev => ({ ...prev, [attrId]: true }));

  const handleSaveNewValue = async (typeCourtId, attrId, attributeKeyId) => {
    const data = {
      attributeKeyCourtId: attributeKeyId,
      value: newValue
    };
    try {
      const response = await CallApi('/api/host/attribute-court', 'post', data);
      const newValueId = response.data.id; // Assuming the response contains the new attribute's ID
      handleAttributeChange(typeCourtId, attrId, 'value', { id: newValueId, name: newValue });
      setNewValue('');
      setIsCreatingValue(prev => ({ ...prev, [attrId]: false }));
      toast.success('Tạo giá trị mới thành công');
    } catch (error) {
      console.log('Error creating new value:', error);
      toast.error('Tạo giá trị mới thất bại');
    }
  };

  const handleCreateAttribute = () => setIsCreatingAttribute(true);

  const handleSaveNewAttribute = async (typeCourtId) => {
    try {
      const data = {
        name: newAttribute.name,
        description: null,
        value: newAttribute.value,
        typeCourtId: typeCourtId,
      };
  
      const response = await CallApi('/api/host/attribute-key-court', 'post', data);
      const createdAttributeKeyCourt = response.data;
  
      setTypeCourtAttributes(prev => ({
        ...prev,
        [createdAttributeKeyCourt.id]: [
          createdAttributeKeyCourt.attributeCourt[0], // Thuộc tính mới sẽ được thêm lên đầu
          ...(prev[createdAttributeKeyCourt.id] || []),
        ],
      }));
  
      setTypeCourts(prevTypeCourts =>
        prevTypeCourts.map(tc =>
          tc.id === typeCourtId
            ? {
                ...tc,
                attributes: [
                  {
                    id: createdAttributeKeyCourt.attributeCourt[0].id,
                    attributeKey: {
                      id: createdAttributeKeyCourt.id,
                      name: createdAttributeKeyCourt.name,
                    },
                    value: {
                      id: createdAttributeKeyCourt.attributeCourt[0].id,
                      name: createdAttributeKeyCourt.attributeCourt[0].value,
                    },
                  },
                  ...tc.attributes, // Thuộc tính mới sẽ được thêm lên đầu
                ],
              }
            : tc
        )
      );
  
      setNewAttribute({ name: '', value: '' });
      setIsCreatingAttribute(false);
      toast.success('Tạo thuộc tính mới thành công');
    } catch (error) {
      console.log('Error creating new attribute key court:', error);
      toast.error('Tạo thuộc tính mới thất bại');
    }
  };
  
  
  

  const handleCancelNewAttribute = () => { setIsCreatingAttribute(false); setNewAttribute({ name: '', value: '' }); };

  const handleDeleteRow = (typeCourtId, attrId) => setTypeCourts(typeCourts.map(tc => tc.id === typeCourtId ? { ...tc, attributes: tc.attributes.filter(attr => attr.id !== attrId) } : tc));

  const getAttributeKeys = attributeKeyName => accountAttributes.find(attr => attr.name === attributeKeyName)?.values || [];

  const getDefaultAttributeValue = (typeCourtId, attrId, field) => {
    const typeCourt = typeCourts.find(tc => tc.id === typeCourtId);
    if (!typeCourt) return '';
    
    const attribute = typeCourt.attributes.find(attr => attr.id === attrId);
    if (!attribute) return '';
    
    return attribute[field]?.id || ''; // Đảm bảo rằng `attribute[field]` là đúng kiểu và tồn tại
  };
  

  const handleSaveTypeCourt = async (formData, isEdit, typeCourtId) => {
    try {
      if (isEdit) {
        await CallApi(`/api/host/type-court/${typeCourtId}`, 'put', formData);
      } else {
        await CallApi('/api/host/type-court', 'post', formData);
      }
      await fetchTypeCourts();
      toast.success(isEdit ? 'Cập nhật loại sân thành công' : 'Tạo loại sân thành công');
    } catch (error) {
      console.log('Error saving type court:', error);
      toast.error(isEdit ? 'Cập nhật loại sân thất bại' : 'Tạo loại sân thất bại');
    }
  };

  return (
    <Box className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Quản Lý Loại Sân</h1>
      <Box className="flex justify-end mb-4">
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
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
                  setIsCreatingValue={setIsCreatingValue}
                  setTypeCourtAttributes={setTypeCourtAttributes}
                  setTypeCourts={setTypeCourts}
                  setEditRows={setEditRows}
                  typeCourts={typeCourts}
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
      <ImageModal isOpen={isImageModalOpen} onClose={handleCloseImageModal} image={currentImage} />
    </Box>
  );
};

export default TypeCourtTable;
