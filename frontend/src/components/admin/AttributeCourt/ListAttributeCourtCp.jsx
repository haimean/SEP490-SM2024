import { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import CreateAttributeCourtCp from "./CreateAttributeCourtCp.jsx";
import UpdateAttributeCourtCp from "./UpdateAttributeCourtCp.jsx";
import ListAttributeKey from "../ListAttributeKey.jsx";

const ListAttributeCourtCp = () => {
  const [courtAtbKeyList, setCourtAtbKeyList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchCourtAtbKeyList();
  }, []);

  const fetchCourtAtbKeyList = async () => {
    try {
      const response = await CallApi("/api/admin/attribute-court/key", "get");
      setCourtAtbKeyList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch list court attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchCourtAtbKeyList();
  };

  const openUpdateModal = (id) => {
    setId(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchCourtAtbKeyList();
  };

  return (
    <>
      <ListAttributeKey
        title="Thuộc tính sân đấu"
        urlDetail="/admin/detail-court-attribute"
        attributeList={courtAtbKeyList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
      />
      {isModalCreateOpen && (
        <CreateAttributeCourtCp closeModal={closeCreateModal} />
      )}
      {isModalUpdateOpen && (
        <UpdateAttributeCourtCp closeModal={closeUpdateModal} id={id} />
      )}
    </>
  );
};

export default ListAttributeCourtCp;
