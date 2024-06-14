import React from "react";
import InputLabel from "../../../components/common/InputLabel";
import { useForm } from "react-hook-form";

const Profile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="max-w-7xl mx-auto my-20 p-6 bg-white border shadow-lg rounded-md flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="w-full lg:w-1/3 p-4 border-r border-gray-200">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src="path/to/avatar.jpg"
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        {/* <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 13V16H7L16.2929 6.70711L13.2929 3.70711L4 13ZM17.7071 5.29289C18.0976 5.68342 18.0976 6.31658 17.7071 6.70711L16.2929 8.12132L11.8787 3.70711L13.2929 2.29289C13.6834 1.90237 14.3166 1.90237 14.7071 2.29289L17.7071 5.29289Z" />
              </svg>
            </button> */}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Tim Cook</h3>
                    <p className="text-gray-500">CEO of Apple</p>
                </div>
                {/* <div className="mt-6">
          <ul className="text-center">
            <li className="py-2 border-b">
              Opportunities applied:{" "}
              <span className="font-semibold text-blue-500">32</span>
            </li>
            <li className="py-2 border-b">
              Opportunities won:{" "}
              <span className="font-semibold text-green-500">26</span>
            </li>
            <li className="py-2">
              Current opportunities:{" "}
              <span className="font-semibold text-gray-500">6</span>
            </li>
          </ul>
        </div> */}
                <div className="mt-4 flex justify-center">
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        Change Password
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-2/3 p-4">
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputLabel
                            label="First Name"
                            id="firstName"
                            placeholder="Tim"
                            register={register}
                            pattern={{
                                value: /^\s*\S.*$/,
                                message: "Please enter a valid character"
                            }}
                            errors={errors}
                            required={{ value: true, message: "First Name is required" }}
                            type="text"
                        />
                        <InputLabel
                            label="Last Name"
                            id="lastName"
                            placeholder="Cook"
                            register={register}
                            pattern={{
                                value: /^\s*\S.*$/,
                                message: "Please enter a valid character"
                            }}
                            errors={errors}
                            required={{ value: true, message: "Last Name is required" }}
                            type="text"
                        />
                        <InputLabel
                            label="Phone Number"
                            id="phoneNumber"
                            placeholder="(408) 996-1010"
                            register={register}
                            pattern={{
                                value: /^\s*\S.*$/,
                                message: "Please enter a valid character"
                            }}
                            errors={errors}
                            required={{ value: true, message: "Phone Number is required" }}
                            type="tel"
                        />
                        <div>
                            <label className="block text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="tcook@apple.com"
                                className="mt-1 block w-full rounded-md border-gray-500 border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                placeholder="New York"
                                className="mt-1 block w-full rounded-md border-gray-500 border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Country</label>
                            <select className="mt-1 block w-full rounded-md border-gray-500 border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option>America</option>
                                <option>Other Country</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
