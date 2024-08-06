import React, { useEffect, useState } from "react";
import CallApi from "../../../service/CallAPI";
import { PieChart } from "@mui/x-charts";

const PieChartAdmin = React.memo(() => {
  const [dataAccount, setDataAccount] = useState({});
  const getDataAccount = async () => {
    try {
      const result = await CallApi("/api/admin/account/get-all", "get");
      setDataAccount(result?.data);
    } catch (error) {
      console.log("🚀 ========= error:", error);
    }
  };

  useEffect(() => {
    getDataAccount();
  }, []);
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: dataAccount?.totalHost || 0, label: "Chủ sân" },
              {
                id: 1,
                value: dataAccount?.totalPlayer || 0,
                label: "Người chơi",
              },
            ],
            innerRadius: 30,
          },
        ]}
        width={400}
        height={250}
      />
    </div>
  );
});
PieChartAdmin.displayName = "PieChart";

export default PieChartAdmin;
