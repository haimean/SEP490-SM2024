import SvgColor from "../../svg-color";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/admin/list-account",
    icon: icon("ic_analytics"),
  },
  {
    title: "list account",
    path: "/admin/list-account",
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "accept account host",
    path: "/admin/list-account",
    icon: icon("ic_blog"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
