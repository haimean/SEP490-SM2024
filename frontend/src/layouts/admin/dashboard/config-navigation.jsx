import SvgColor from "../../../components/admin/common/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Thống kê",
    path: "/admin/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "Tài khoản",
    path: "/admin/list-account",
    icon: icon("ic_user"),
  },
  {
    title: "Tố cáo bài đăng",
    path: "/admin/report-blog",
    icon: icon("ic_report"),
  },
  {
    title: "Thuộc tính chi nhánh",
    path: "/admin/branch-attribute",
    icon: icon("ic_cart"),
  },
  {
    title: "Thuộc tính sân đấu",
    path: "/admin/court-attribute",
    icon: icon("ic_blog"),
  },
  {
    title: "Duyệt chi nhánh",
    path: "/admin/accept-branch",
    icon: icon("ic_approve"),
  },
  {
    title: "Danh sách chi nhánh",
    path: "/admin/list-branch",
    icon: icon("ic_court"),
  },
  {
    title: "Not found",
    path: "/admin/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
