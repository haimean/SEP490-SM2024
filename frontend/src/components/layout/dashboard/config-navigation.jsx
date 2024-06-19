import { FaTags, FaChartBar, FaCodeBranch } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaChartBar />,
  },
  {
    title: "Manage Branch Attribute",
    path: "/admin/branch-attribute",
    icon: <FaCodeBranch />,
  },
  {
    title: "Manage Court Attribute",
    path: "/admin/court-attribute",
    icon: <FaTags />,
  },
  {
    title: "list account",
    path: "/admin/list-account",
    icon: <MdOutlineSupervisorAccount />,
  },
];

export default navConfig;
