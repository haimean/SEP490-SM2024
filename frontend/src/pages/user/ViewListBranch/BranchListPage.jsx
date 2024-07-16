import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BranchFilter from '../../../components/user/Branch/BranchFilter';
import BranchCard from '../../../components/user/Branch/BranchCard';
// import testImg from "D:/1_2024-05-SEM9/DOAN/scl.jpg"
import { toast } from 'react-toastify';

const testImg = "https://via.placeholder.com/200"
const branches = [
  {
    id: 1,
    name: "Sân vận động Mỹ Đình",
    province: "Thành phố Hà Nội",
    district: "Quận Nam Từ Liêm",
    ward: "Phường Mỹ Đình 1",
    location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
    image: testImg,
  },
  {
    id: 2,
    name: "Sân vận động Mỹ Đình",
    province: "Thành phố Hà Nội",
    district: "Quận Nam Từ Liêm",
    ward: "Phường Mỹ Đình 1",
    location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
    image: testImg,
  },
  {
    id: 3,
    name: "Sân vận động Mỹ Đình",
    province: "Thành phố Hà Nội",
    district: "Quận Nam Từ Liêm",
    ward: "Phường Mỹ Đình 1",
    location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
    image: testImg,
  },
  {
    id: 4,
    name: "Sân vận động Mỹ Đình",
    province: "Thành phố Hà Nội",
    district: "Quận Nam Từ Liêm",
    ward: "Phường Mỹ Đình 1",
    location: "Đường Lê Đức Thọ, Mỹ Đình, Nam Từ Liêm, Hà Nội",
    image: testImg,
  },
];

const BranchListPage = () => {
  const [filters, setFilters] = useState({
    province: '',
    district: '',
    ward: '',
    search: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CallApi(
        "/api/branches/1",
        "get",
        {},
        {}
      );
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleFilterChange = (province, district, ward, search) => {
    setFilters({ province, district, ward, search });
  };

  const filteredBranches = branches.filter(branch => {
    if (filters.province && branch.province !== filters.province) return false;
    if (filters.district && branch.district !== filters.district) return false;
    if (filters.ward && branch.ward !== filters.ward) return false;
    if (filters.search && !branch.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Container className='my-32'>
      <BranchFilter onFilterChange={handleFilterChange} />
      <div className="text-center my-4">
        <Typography variant="h6">
          Tìm thấy <span className="text-red-500">{filteredBranches.length}</span> kết quả
        </Typography>
      </div>
      <Grid container spacing={2}>
        {filteredBranches.map((branch) => (
          <Grid item xs={12} md={6} key={branch.id}>
            <BranchCard
              name={branch.name}
              location={branch.location}
              time={branch.time}
              image={branch.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BranchListPage;
