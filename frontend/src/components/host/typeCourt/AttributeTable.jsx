import React from 'react';
import {
  Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem
} from '@mui/material';

const AttributeTable = ({
  typeCourt, attributeDataState, openRows, editRows, isCreatingValue, newValue, getDefaultAttributeValue,
  getAttributeKeys, handleAttributeChange, handleCreateValue, handleSaveNewValue, handleCancelEdit,
  handleSaveRow, handleEditRow, handleDeleteRow, setNewValue, isCreatingAttribute, handleCreateAttribute,
  handleSaveNewAttribute, handleCancelNewAttribute, newAttribute, setNewAttribute, typeCourtAttributes
}) => (
  <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
      <Collapse in={openRows[typeCourt.id]} timeout="auto" unmountOnExit>
        <Box margin={1}>
          <Table size="small" aria-label="purchases" className="table-fixed">
            <TableHead>
              <TableRow>
                <TableCell align="right" colSpan={3}>
                  <Button variant="contained" color="primary" onClick={handleCreateAttribute}>
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

export default AttributeTable;
