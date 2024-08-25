/* eslint-disable react/prop-types */

import { Box, Button, Typography } from "@mui/material";
import { isAfter, isBefore, isEqual, parseISO } from "date-fns";
import { useEffect, useState } from "react";

import AddNewTimesGroupForm from "./AddNewTimesGroupForm";
import CallApi from "../../../service/CallAPI";
import PriceTable from "./PriceTable";
import { toast } from "react-toastify";

const PriceSetupPage = ({ typeCourtId = 1 }) => {
  const [priceLists, setPriceLists] = useState({});
  const [newRows, setNewRows] = useState({});
  const [editingRows, setEditingRows] = useState({});
  const [newTimesGroup, setNewTimesGroup] = useState({
    start: "",
    end: "",
    price: "",
    times: "",
  });
  const [showNewTimesForm, setShowNewTimesForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CallApi(
        `/api/host/type-court/${typeCourtId}/price`,
        "get",
        {},
        {}
      );
      const data = response.data.reduce((acc, item) => {
        const times = item.times;
        if (!acc[times]) {
          acc[times] = [];
        }
        acc[times].push({
          id: item.id,
          start: new Date(item.startTime.replace("Z", ""))
            .toISOString()
            .substring(11, 16),
          end: new Date(item.endTime.replace("Z", ""))
            .toISOString()
            .substring(11, 16),
          price: item.price,
        });
        return acc;
      }, {});
      Object.keys(data).forEach((times) => {
        data[times].sort((a, b) => a.start.localeCompare(b.start));
      });
      setPriceLists(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
    }
  };

  const isOverlapping = (times, newStart, newEnd, ignoreIndex = null) => {
    const existingPrices = priceLists[times] || [];
    const newStartDate = parseISO(`1970-01-01T${newStart}:00.000Z`);
    const newEndDate = parseISO(`1970-01-01T${newEnd}:00.000Z`);

    return existingPrices.some((price, index) => {
      if (ignoreIndex !== null && index === ignoreIndex) return false;

      const startDate = parseISO(`1970-01-01T${price.start}:00.000Z`);
      const endDate = parseISO(`1970-01-01T${price.end}:00.000Z`);

      return (
        (isBefore(newStartDate, endDate) && isAfter(newEndDate, startDate)) ||
        isEqual(newStartDate, startDate) ||
        isEqual(newEndDate, endDate)
      );
    });
  };

  const handleInputChange = (e, times, index) => {
    const { name, value } = e.target;
    const updatedRows = { ...editingRows };
    if (index !== undefined) {
      if (!updatedRows[times]) {
        updatedRows[times] = {};
      }
      if (!updatedRows[times][index]) {
        updatedRows[times][index] = { ...priceLists[times][index] };
      }
      updatedRows[times][index][name] = value;
      setEditingRows(updatedRows);
    } else {
      const updatedNewRows = { ...newRows };
      if (!updatedNewRows[times]) {
        updatedNewRows[times] = { start: "", end: "", price: "" };
      }
      updatedNewRows[times][name] = value;
      setNewRows(updatedNewRows);
    }
  };

  const handleAddNewTimesGroup = async () => {
    const { start, end, price, times } = newTimesGroup;
    if (start && end && price && times) {
      const startTime = new Date(`1970-01-01T${start}:00.000Z`);
      const endTime = new Date(`1970-01-01T${end}:00.000Z`);

      if (isAfter(startTime, endTime) || isEqual(startTime, endTime)) {
        toast.error("Giờ bắt đầu phải nhỏ hơn giờ kết thúc");
        return;
      }

      if (isOverlapping(times, start, end)) {
        toast.error("Khoảng thời gian bị trùng với giá hiện tại");
        return;
      }

      const newPriceData = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        price: parseInt(price),
        times: parseInt(times),
      };

      try {
        await CallApi(
          `/api/host/type-court/${typeCourtId}/price`,
          "post",
          { data: [newPriceData] },
          {}
        );
        toast.success("Đã thêm nhóm thời gian mới thành công");
        fetchData();
        setShowNewTimesForm(false);
        setNewTimesGroup({ start: "", end: "", price: "", times: "" });
      } catch (error) {
        toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
      }
    } else {
      toast.error("Vui lòng điền tất cả các trường");
    }
  };

  const handleAddPrice = async (times) => {
    const { start, end, price } = newRows[times];
    if (start && end && price) {
      const startTime = new Date(`1970-01-01T${start}:00.000Z`);
      const endTime = new Date(`1970-01-01T${end}:00.000Z`);

      if (isAfter(startTime, endTime) || isEqual(startTime, endTime)) {
        toast.error("Giờ bắt đầu phải nhỏ hơn giờ kết thúc");
        return;
      }

      if (isOverlapping(times, start, end)) {
        toast.error("Khoảng thời gian bị trùng với giá hiện tại");
        return;
      }

      const newPriceData = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        price: parseInt(price),
        times: parseInt(times),
      };

      try {
        await CallApi(
          `/api/host/type-court/${typeCourtId}/price`,
          "post",
          { data: [newPriceData] },
          {}
        );
        toast.success("Đã thêm giá thành công");
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
      }

      const updatedNewRows = { ...newRows };
      delete updatedNewRows[times];
      setNewRows(updatedNewRows);
    } else {
      toast.error("Vui lòng điền tất cả các trường");
    }
  };

  const handleDeletePrice = async (times, index) => {
    const priceToDelete = priceLists[times][index];
    if (priceToDelete.id) {
      try {
        await CallApi(
          `/api/host/type-court/${typeCourtId}/price`,
          "delete",
          { data: [{ id: priceToDelete.id }] },
          {}
        );
        toast.success("Đã xóa giá thành công");
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
      }
    }

    const updatedPriceLists = { ...priceLists };
    updatedPriceLists[times] = updatedPriceLists[times].filter(
      (_, i) => i !== index
    );
    setPriceLists(updatedPriceLists);
  };

  const handleDeleteAllPrices = async (times) => {
    const priceIdsToDelete = priceLists[times].map((price) => price.id);
    try {
      await CallApi(
        `/api/host/type-court/${typeCourtId}/price`,
        "delete",
        { data: priceIdsToDelete.map((id) => ({ id })) },
        {}
      );
      toast.success(
        `Đã xóa tất cả giá cho khoảng thời gian ${times} thành công`
      );
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
    }
  };

  const handleEditPrice = (times, index) => {
    const updatedEditingRows = { ...editingRows };
    if (!updatedEditingRows[times]) {
      updatedEditingRows[times] = {};
    }
    updatedEditingRows[times][index] = { ...priceLists[times][index] };
    setEditingRows(updatedEditingRows);
  };

  const handleConfirmEditPrice = async (times, index) => {
    const updatedPrice = editingRows[times][index];
    const startTime = new Date(`1970-01-01T${updatedPrice.start}:00.000Z`);

    const endTime = new Date(`1970-01-01T${updatedPrice.end}:00.000Z`);

    if (isAfter(startTime, endTime) || isEqual(startTime, endTime)) {
      toast.error("Giờ bắt đầu phải nhỏ hơn giờ kết thúc");
      return;
    }

    if (isOverlapping(times, updatedPrice.start, updatedPrice.end, index)) {
      toast.error("Khoảng thời gian bị trùng với giá hiện tại");
      return;
    }

    const priceData = {
      id: updatedPrice.id,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      price: parseInt(updatedPrice.price),
      times: parseInt(times),
    };

    try {
      await CallApi(
        `/api/host/type-court/${typeCourtId}/price`,
        "put",
        { data: [priceData] },
        {}
      );
      toast.success("Đã cập nhật giá thành công");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi");
    }

    const updatedEditingRows = { ...editingRows };
    delete updatedEditingRows[times][index];
    setEditingRows(updatedEditingRows);
  };

  const handleCancelEditRow = (times, index) => {
    const updatedEditingRows = { ...editingRows };
    delete updatedEditingRows[times][index];
    setEditingRows(updatedEditingRows);
  };

  const handleCancelNewRow = (times) => {
    const updatedNewRows = { ...newRows };
    delete updatedNewRows[times];
    setNewRows(updatedNewRows);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ my: 8 }}>
        {!showNewTimesForm ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowNewTimesForm(true)}
          >
            Thêm nhóm thời gian mới
          </Button>
        ) : (
          <AddNewTimesGroupForm
            newTimesGroup={newTimesGroup}
            setNewTimesGroup={setNewTimesGroup}
            handleAddNewTimesGroup={handleAddNewTimesGroup}
            setShowNewTimesForm={setShowNewTimesForm}
          />
        )}
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Thiết lập giá cho khung giờ
      </Typography>
      {Object.keys(priceLists).map((times) => (
        <PriceTable
          key={times}
          times={times}
          priceLists={priceLists}
          editingRows={editingRows}
          handleInputChange={handleInputChange}
          handleConfirmEditPrice={handleConfirmEditPrice}
          handleCancelEditRow={handleCancelEditRow}
          handleEditPrice={handleEditPrice}
          handleDeletePrice={handleDeletePrice}
          handleDeleteAllPrices={handleDeleteAllPrices}
          newRows={newRows}
          handleAddPrice={handleAddPrice}
          handleCancelNewRow={handleCancelNewRow}
          setNewRows={setNewRows}
        />
      ))}
    </Box>
  );
};

export default PriceSetupPage;
