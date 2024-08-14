import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import CreateAttributeBranchCp from "./CreateAttributeBranchCp.jsx";
import UpdateAttributeBranchCp from "./UpdateAttributeBranchCp.jsx";
import ListAttributeKey from "../ListAttributeKey.jsx";

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
        title="Thuộc tính cơ sở"
        urlDetail="/admin/detail-branch-attribute"
        attributeList={branchAtbKeyList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
      />
      {isModalCreateOpen && (
        <CreateAttributeBranchCp closeModal={closeCreateModal} />
      )}
      {isModalUpdateOpen && (
        <UpdateAttributeBranchCp closeModal={closeUpdateModal} id={id} />
      )}
    </>
  );
};

export default ListAttributeBranchCp;
