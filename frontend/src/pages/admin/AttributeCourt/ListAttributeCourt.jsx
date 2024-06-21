import React from "react";
import ListAttributeCourtCp from "../../../components/admin/AttributeCourt/ListAttributeCourtCp";
import DashboardLayout from "../../../layouts/admin/dashboard";

const ListAttributeCourt = () => {
  return (
    <>
      <DashboardLayout>
        <ListAttributeCourtCp />
      </DashboardLayout>
    </>
  );
};

export default ListAttributeCourt;
