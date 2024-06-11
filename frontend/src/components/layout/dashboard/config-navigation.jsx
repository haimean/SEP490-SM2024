import SvgColor from "../../svg-color";
import { FaTags, FaChartBar, FaCodeBranch } from "react-icons/fa";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaChartBar />,
  },
  {
    title: "Manage Branch Attribute",
    path: "/admin/branch-attribute",
    icon: <FaCodeBranch/>,
  },
  {
    title: "Manage Court Attribute",
    path: "/admin/court-attribute",
    icon: <FaTags />,
  },
];

export default navConfig;
