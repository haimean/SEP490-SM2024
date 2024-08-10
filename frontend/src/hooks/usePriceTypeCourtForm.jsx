import { useState } from "react";
import PriceTypeCourtForm from "../components/host/typeCourt/PriceTypeCourtForm";

const usePriceTypeCourtForm = (onSubmit) => {
  const [isOpen, setIsOpen] = useState(false);
  const [listTimeDialog, setListTime] = useState([]);
  const [priceTypeCourtDialog, setPriceTypeCourt] = useState([]);

  const openForm = (listTime = [], priceTypeCourt = []) => {
    setIsOpen(true);
    setListTime(listTime);
    setPriceTypeCourt(priceTypeCourt);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (data) => {
    if (typeof onSubmit === "function") {
      onSubmit(data); // Gọi callback onSubmit với dữ liệu từ form
    }
    closeForm(); // Đóng modal sau khi submit
  };

  const PriceTypeCourtFormComponent = (
    <PriceTypeCourtForm
      listTime={listTimeDialog}
      priceTypeCourt={priceTypeCourtDialog}
      open={isOpen}
      onClose={closeForm}
      onSubmit={handleFormSubmit}
    />
  );

  return {
    openForm,
    closeForm,
    PriceTypeCourtFormComponent,
  };
};

export default usePriceTypeCourtForm;
