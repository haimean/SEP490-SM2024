import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";

const branchesData = [
  {
    name: "Branch A",
    courts: [
      { name: "Sân 1", usage: 58 },
      { name: "Sân 2", usage: 21 },
      { name: "Sân 3", usage: 22 },
    ],
  },
  {
    name: "Branch B",
    courts: [
      { name: "Sân 1", usage: 34 },
      { name: "Sân 2", usage: 66 },
    ],
  },
];

const Sidebar = ({
  selectedBranch,
  setSelectedBranch,
  selectedCourt,
  setSelectedCourt,
}) => {
  const handleBranchChange = (event) => {
    const branchName = event.target.value;
    setSelectedBranch(branchName);
    const branch = branchesData.find((branch) => branch.name === branchName);
    setSelectedCourt(branch ? branch.courts[0].name : "");
  };

  const handleCourtChange = (event, newValue) => {
    setSelectedCourt(newValue);
  };

  const selectedBranchData = branchesData.find(
    (branch) => branch.name === selectedBranch
  );

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Chọn cơ sở</InputLabel>
        <Select value={selectedBranch} onChange={handleBranchChange}>
          {branchesData.map((branch) => (
            <MenuItem key={branch.name} value={branch.name}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedBranchData && (
        <Tabs
          value={selectedCourt}
          onChange={handleCourtChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {selectedBranchData.courts.map((court) => (
            <Tab key={court.name} label={court.name} value={court.name} />
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Sidebar;
