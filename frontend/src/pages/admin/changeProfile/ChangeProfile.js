import React from "react";
import EditProfileForm from "../../../components/common/EditProfile";
import DashboardLayout from "../../../components/layout/dashboard";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    dob: "1990-01-01",
    phoneNumber: "123456789",
    isBan: false,
    isVerify: true,
    role: "user",
    email: "john@example.com",
  };

  const onSubmit = (data) => {
    console.log(data);
    // Gửi dữ liệu cập nhật lên server
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <EditProfileForm onSubmit={onSubmit} user={user} />
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
