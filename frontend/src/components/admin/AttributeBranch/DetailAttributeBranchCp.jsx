import React, { useEffect, useState } from "react";
import CallApi from "../../../services/CallApi.js";
import { useParams } from "react-router-dom";
import CreateAtbBranchValueCp from "./CreateAtbBranchValueCp.js";
import UpdateAtbBranchValueCp from "./UpdateAtbBranchValueCp.js";
import DetailAttributeKey from "../DetailAttributeKey.js";

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

  // const deleteItem = async (id) => {
  //   try {
  //     await CallApi(
  //       `/api/admin/attribute-branches/values/${id}`,
  //       "delete"
  //     );
  //     fetchBranchAtbList();
  //   } catch (error) {
  //     console.log("delete branch attribute value ERROR: ", error.response?.data?.error);
  //   }
  // };

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
        titleCreateButton="Branch Value"
        detailItem={branchAtbKey}
        valueList={filteredBranchAtbList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
        // deleteItem={deleteItem}
      />
      {isModalCreateOpen && (
        <CreateAtbBranchValueCp
          closeModal={closeCreateModal}
          attributeKeyBranchesId={id}
        />
      )}
      {isModalUpdateOpen && (
        <UpdateAtbBranchValueCp
          closeModal={closeUpdateModal}
          attributeKeyBranchesId={id}
          id={idSelected}
        />
      )}
    </>
  );
};

export default DetailAttributeBranchCp;
