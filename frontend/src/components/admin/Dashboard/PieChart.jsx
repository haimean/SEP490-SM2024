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
            arcLabel: (item) => `${item.value} người`,
            arcLabelMinAngle: 45,
            data: [
              {
                id: 0,
                value: dataAccount?.totalHost || 0,
                label: `Chủ sân`,
              },
              {
                id: 1,
                value: dataAccount?.totalPlayer || 0,
                label: `Người chơi`,
              },
            ],
            innerRadius: 30,
          },
        ]}
        height={250}
        tooltip={false}
      />
    </div>
  );
});
PieChartAdmin.displayName = "PieChartAdmin";

export default PieChartAdmin;
