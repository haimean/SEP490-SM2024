import React, { useEffect, useState } from "react";
import CallApi from "../../../services/CallApi.js";
import CreateAttributeBranchCp from "./CreateAttributeBranchCp.js";
import UpdateAttributeBranchCp from "./UpdateAttributeBranchCp.js";
import ListAttributeKey from '../ListAttributeKey.js';

const ListAttributeBranchCp = () => {
  const [branchAtbKeyList, setBranchAtbKeyList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchBranchAtbKeyList();
  }, []);

  const fetchBranchAtbKeyList = async () => {
    try {
      const response = await CallApi(
        "/api/admin/attribute-branches/key",
        "get"
      );
      setBranchAtbKeyList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch list branch attribute ERROR: " +
        error.response?.data?.error
      );
    }
  };

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchBranchAtbKeyList();
  };

  const openUpdateModal = (id) => {
    setId(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchBranchAtbKeyList();
  };

  return (
    <>
      <ListAttributeKey
        title="Branch Attribute"
        urlDetail="/admin/detail-branch-attribute"
        attributeList={branchAtbKeyList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
      />
      {isModalCreateOpen && <CreateAttributeBranchCp closeModal={closeCreateModal} />}
      {isModalUpdateOpen && <UpdateAttributeBranchCp closeModal={closeUpdateModal} id={id} />}
    </>
  );
};

export default ListAttributeBranchCp;
