import React from 'react';
import {
  Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem
} from '@mui/material';
import CallApi from '../../../service/CallAPI';
import { toast } from 'react-toastify';

const AttributeTable = ({
  typeCourt, attributeDataState, openRows, editRows, isCreatingValue, newValue, getDefaultAttributeValue,
  setEditRows, handleAttributeChange, handleCreateValue, handleSaveNewValue, handleCancelEdit,
  handleSaveRow, handleEditRow, handleDeleteRow, setNewValue, isCreatingAttribute, handleCreateAttribute,
  handleSaveNewAttribute, handleCancelNewAttribute, newAttribute, setNewAttribute, typeCourtAttributes, setIsCreatingValue, setTypeCourtAttributes, setTypeCourts
}) => {
  const handleCreateNewValue = async (typeCourtId, attributeId, attributeKeyId) => {
    const data = {
      attributeKeyCourtId: attributeKeyId,
      value: newValue
    };
    try {
      const response = await CallApi('/api/host/attribute-court', 'post', data);
      const newValueId = response.data.id;

      // Tạo giá trị mới cho thuộc tính
      const newAttribute = { id: newValueId, name: newValue };

      // Cập nhật typeCourtAttributes
      setTypeCourtAttributes(prev => ({
        ...prev,
        [attributeKeyId]: [...(prev[attributeKeyId] || []), newAttribute]
      }));

      // Cập nhật typeCourts
      setTypeCourts(prevTypeCourts =>
        prevTypeCourts.map(tc =>
          tc.id === typeCourtId
            ? {
              ...tc,
              attributes: tc.attributes.map(attr =>
                attr.id === attributeId ? { ...attr, value: newAttribute } : attr
              )
            }
            : tc
        )
      );

      // Đặt lại trạng thái sau khi lưu thành công
      setNewValue('');
      setIsCreatingValue(prev => ({ ...prev, [attributeId]: false }));
      setEditRows(prev => ({ ...prev, [`${typeCourtId}-${attributeId}`]: false }));

      toast.success('Tạo giá trị mới thành công');
    } catch (error) {
      console.log('Error creating new value:', error);
      toast.error('Tạo giá trị mới thất bại');
    }
  };

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
        <Collapse in={openRows[typeCourt.id]} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Table size="small" aria-label="purchases" className="table-fixed">
              <TableHead>
                <TableRow>
                  <TableCell align="right" colSpan={3}>
                    <Button variant="contained" color="primary" 
                    // onClick={handleCreateAttribute}
                    >
                      Tạo mới thuộc tính
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className="w-1/3">Thuộc Tính</TableCell>
                  <TableCell align="center" className="w-1/3">Giá Trị</TableCell>
                  <TableCell align="center" className="w-1/3">Hành Động</TableCell>
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
                            onChange={e => {
                              if (e.target.value === 'create-new-attribute') {
                                handleCreateAttribute();  // Gọi hàm để tạo mới thuộc tính
                                setEditRows(prev => ({
                                  ...prev,
                                  [`${typeCourt.id}-${attribute.id}`]: false, // Reset trạng thái của Select
                                }));
                              } else {
                                handleAttributeChange(typeCourt.id, attribute.id, 'attributeKey', {
                                  id: e.target.value,
                                  name: attributeDataState.find(attr => attr.id === e.target.value).name,
                                });
                              }
                            }}
                            className="w-36"
                          >
                            <MenuItem value="create-new-attribute">Tạo mới thuộc tính</MenuItem>
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
                            {isCreatingValue[attribute.id] ? (
                              <TextField
                                value={newValue}
                                onChange={e => setNewValue(e.target.value)}
                                placeholder="Giá trị mới"
                                className="w-36"
                              />
                            ) : (
                              <Select
                                value={getDefaultAttributeValue(typeCourt.id, attribute.id, 'value')}
                                onChange={e => {
                                  if (e.target.value === 'new') {
                                    handleCreateValue(attribute.id);
                                  } else {
                                    handleAttributeChange(typeCourt.id, attribute.id, 'value', {
                                      id: e.target.value,
                                      name: typeCourtAttributes[attribute.attributeKey.id]?.find(val => val.id === e.target.value)?.value || ''
                                    });
                                  }
                                }}
                                className="w-36"
                              >
                                <MenuItem value="new">Tạo mới</MenuItem>
                                {typeCourtAttributes[attribute.attributeKey.id]?.map(key => (
                                  <MenuItem key={key.id} value={key.id}>
                                    {key.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          </>
                        ) : (
                          attribute.value.name
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {editRows[`${typeCourt.id}-${attribute.id}`] && (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => isCreatingValue[attribute.id] ? handleCreateNewValue(typeCourt.id, attribute.id, attribute.attributeKey.id) : handleSaveRow(typeCourt.id, attribute.id)}
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
                        )}
                        {!editRows[`${typeCourt.id}-${attribute.id}`] && (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEditRow(typeCourt.id, attribute)}
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
};

export default AttributeTable;
