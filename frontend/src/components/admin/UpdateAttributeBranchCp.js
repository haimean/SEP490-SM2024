import React from 'react';

const UpdateAttributeBranchCp = () => {
  return (
    <div className='flex justify-center mt-4'>
      <div className="mb-4 w-2/3">
        <form className='w-full'>
          <label htmlFor="outlined-required" className="block text-gray-700 text-sm font-bold mb-2">
            Required
          </label>
          <input
            required
            id="outlined-required"
            defaultValue=""
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex justify-end my-4">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
              Update Attribute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAttributeBranchCp;