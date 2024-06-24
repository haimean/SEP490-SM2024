import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import { useParams } from "react-router-dom";
import CreateAttributeBranchValueCp from "./CreateAttributeBranchValueCp.jsx";
import UpdateAttributeBranchValueCp from "./UpdateAttributeBranchValueCp.jsx";
import DetailAttributeKey from "../DetailAttributeKey.jsx";

const DetailAttributeBranchCp = () => {
  const [branchAtbKey, setBranchAtbKey] = useState({});
  const [branchAtbList, setBranchAtbList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchBranchAtbKey();
    fetchBranchAtbList();
  }, [id]);

  const fetchBranchAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-branches/key/${id}`,
        "get"
      );
      setBranchAtbKey(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch branch attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const fetchBranchAtbList = async () => {
    try {
      const response = await CallApi(`/api/admin/attribute-branches`, "get");
      setBranchAtbList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch branch attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const filteredBranchAtbList = branchAtbList.filter((item) => {
    return item.attributeKeyBranchesId == id;
  });

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchBranchAtbList();
  };

  const openUpdateModal = (id) => {
    setIdSelected(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchBranchAtbList();
  };

  return (
    <>
      <DetailAttributeKey
        detailItem={branchAtbKey}
        valueList={filteredBranchAtbList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
      />
      {isModalCreateOpen && (
        <CreateAttributeBranchValueCp
          closeModal={closeCreateModal}
          attributeKeyBranchesId={id}
        />
      )}
      {isModalUpdateOpen && (
        <UpdateAttributeBranchValueCp
          closeModal={closeUpdateModal}
          attributeKeyBranchesId={id}
          id={idSelected}
        />
      )}
    </>
  );
};

export default DetailAttributeBranchCp;
