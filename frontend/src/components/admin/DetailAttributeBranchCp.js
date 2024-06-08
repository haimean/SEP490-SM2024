import React from 'react';
import { useParams } from 'react-router-dom';

const DetailAttributeBranchCp = () => {
  const { id } = useParams();

  return (
    <div className="w-full flex justify-center my-4">
      <div className="w-2/3 flex justify-center items-start">
        <div className="w-1/2 text-center">
          <img src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" />
        </div>
        <h1 className="w-1/2 text-center">Detail Page for Item {id}</h1>
      </div>
    </div>
  );
};

export default DetailAttributeBranchCp;