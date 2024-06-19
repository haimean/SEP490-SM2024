import React from "react";
import { useForm } from "react-hook-form";
import {
  MdPerson,
  MdDateRange,
  MdPhone,
  MdCheckBox,
  MdEmail,
} from "react-icons/md";
import pam from "../../assets/images/pam.jpg";
const EditProfileForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid grid-cols-3 gap-4"
    >
      {/* Phần 1: Change Avatar */}
      <div className="col-span-1 text-center">
        <label
          htmlFor="avatar"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-2"
        >
          Change Avatar
        </label>
        <input
          type="file"
          id="avatar"
          {...register("avatar")}
          className="hidden"
        />
        <label htmlFor="avatar" className="cursor-pointer">
          <img
            src={pam}
            alt="Avatar"
            className="w-72 h-72 rounded-full object-cover mx-auto"
          />
        </label>
      </div>

      {/* Phần 2: Thông tin cá nhân */}
      <div className="col-span-1">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <MdPerson className="text-gray-500 m-2" />
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your name"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            />
          </div>

          {errors.name && (
            <span className="text-red-500">This field is required</span>
          )}

          <label
            htmlFor="dob"
            className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date of Birth
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <MdDateRange className="text-gray-500 m-2" />
            <input
              type="date"
              id="dob"
              {...register("dob", { required: true })}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            />
          </div>
          {errors.dob && (
            <span className="text-red-500">This field is required</span>
          )}

          <label
            htmlFor="phoneNumber"
            className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <MdPhone className="text-gray-500 m-2" />
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber", { required: true })}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your phone number"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            />
          </div>
          {errors.phoneNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <MdEmail className="text-gray-500 m-2" />
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            />
          </div>
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      {/* Phần 3: Các lựa chọn */}
      <div className="col-span-1">
        <div className="mb-5">
          <label
            htmlFor="ban"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ban account
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <select
              id="ban"
              {...register("ban")}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            >
              <option value="admin">Ban</option>
              <option value="user">Active</option>
            </select>
            <MdCheckBox className="text-gray-500 m-2" />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="verify"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Verify
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <select
              id="verify"
              {...register("verify")}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            >
              <option value="admin">Chưa active</option>
              <option value="user">Active</option>
            </select>
            <MdCheckBox className="text-gray-500 m-2" />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <div className="border border-gray-300 rounded-lg flex items-center">
            <select
              id="role"
              {...register("role")}
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ outline: "none", border: "none" }} // Remove border and outline
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="admin">Host</option>
            </select>
            <MdCheckBox className="text-gray-500 m-2" />
          </div>
        </div>
      </div>

      {/* Phần nút Submit */}
      <button
        type="submit"
        className="col-span-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default EditProfileForm;
