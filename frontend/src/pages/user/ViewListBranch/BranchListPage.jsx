import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BranchFilter from '../../../components/user/Branch/BranchFilter';
import BranchCard from '../../../components/user/Branch/BranchCard';
import { toast } from 'react-toastify';
import CallApi from '../../../service/CallAPI';

const BranchListPage = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

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
        "/api/branches",
        "get",
        {},
        {}
      );
      setBranches(response?.data);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleFilterChange = (province, district, ward, search) => {
    setFilters({ province, district, ward, search });
  };

  const handleClick = (branchId)=> {
    navigate(`/user/branch/${branchId}`)
  }

  const filteredBranches = branches.filter(branch => {
    if (filters.province && branch.address?.provinces !== filters.province) return false;
    if (filters.district && branch.address?.districts !== filters.district) return false;
    if (filters.ward && branch.address?.wards !== filters.ward) return false;
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
              name={branch?.name}
              location={branch?.address?.detail}
              image={branch?.image}
              onClick={() => handleClick(branch?.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BranchListPage;
