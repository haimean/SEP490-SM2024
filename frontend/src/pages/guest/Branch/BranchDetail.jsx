// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DetailPageCp from "../../../components/host/DetailPageCp";
import { useParams } from "react-router-dom";
import CallApi from "../../../service/CallAPI";
import BaseBox from "../../common/BaseBox";
import Loading from "../../../components/common/Loading";

const BranchDetail = () => {
  const [userRole, setUserRole] = useState("");
  const [branchDetail, setBranchDetail] = useState({});
  const { id } = useParams();
  const role = localStorage.getItem("userRole");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchBranchDetail = async () => {
      setIsLoading(true);
      try {
        const apiUrl = role === "host" ? "/api/host/branches" : "/api/branches";
        const response = await CallApi(`${apiUrl}/${id}`, "get");
        setBranchDetail(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(
          "=============== fetch list branch ERROR: " +
            error.response?.data?.error
        );
      }
    };
    fetchBranchDetail();
  }, [id]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    // Nếu có dữ liệu, cập nhật state
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);
  const map = (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238341.61060617006!2d105.53860539453123!3d21.029177999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4caf655555%3A0x4debb020d93041f0!2sFpt%20Software!5e0!3m2!1svi!2s!4v1719668441308!5m2!1svi!2s"
      width={665}
      height={400}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
  return (
    <BaseBox title="Thông tin cơ sở">
      {isLoading ? (
        <Loading />
      ) : (
        <DetailPageCp
          name={branchDetail?.name}
          image={branchDetail?.image}
          locations={branchDetail?.address?.districts}
          openingHours={branchDetail?.openingHours}
          description={branchDetail?.description}
          closingHours={branchDetail?.closingHours}
          branch={branchDetail}
          id={id}
          role={userRole}
          map={map}
          type={"Branch"}
        />
      )}
    </BaseBox>
  );
};

export default BranchDetail;
