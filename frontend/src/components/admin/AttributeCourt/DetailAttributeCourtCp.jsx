import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI.jsx";
import { useParams } from "react-router-dom";
import CreateAttirbuteCourtValueCp from "./CreateAttributeCourtValueCp.jsx";
import UpdateAttributeCourtValueCp from "./UpdateAttributeCourtValueCp.jsx";
import DetailAttributeKey from "../DetailAttributeKey.jsx";

const DetailAttributeCourtCp = () => {
  const [courtAtbKey, setCourtAtbKey] = useState({});
  const [courtAtbList, setCourtAtbList] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCourtAtbKey();
    fetchCourtAtbList();
  }, [id]);

  const fetchCourtAtbKey = async () => {
    try {
      const response = await CallApi(
        `/api/admin/attribute-court/key/${id}`,
        "get"
      );
      setCourtAtbKey(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch court attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const fetchCourtAtbList = async () => {
    try {
      const response = await CallApi(`/api/admin/attribute-court`, "get");
      setCourtAtbList(response?.data);
    } catch (error) {
      console.log(
        "=============== fetch court attribute ERROR: " +
          error.response?.data?.error
      );
    }
  };

  const filteredCourtAtbList = courtAtbList.filter((item) => {
    return item.attributeKeyCourtId == id;
  });

  const openCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalCreateOpen(false);
    fetchCourtAtbList();
  };

  const openUpdateModal = (id) => {
    setIdSelected(id);
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
    fetchCourtAtbList();
  };

  return (
    <>
      <DetailAttributeKey
        detailItem={courtAtbKey}
        valueList={filteredCourtAtbList}
        openCreateModal={openCreateModal}
        openUpdateModal={openUpdateModal}
      />
      {isModalCreateOpen && (
        <CreateAttirbuteCourtValueCp
          closeModal={closeCreateModal}
          attributeKeyCourtId={id}
        />
      )}
      {isModalUpdateOpen && (
        <UpdateAttributeCourtValueCp
          closeModal={closeUpdateModal}
          attributeKeyCourtId={id}
          id={idSelected}
        />
      )}
    </>
  );
};

export default DetailAttributeCourtCp;
