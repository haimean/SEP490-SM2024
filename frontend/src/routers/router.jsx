import AcceptBranch from "../components/admin/AcceptBranch/AcceptBranch.jsx";
import AvailableCourtPage from "../pages/user/AvailableCourt/AvailableCourt.jsx";
import BookedCourts from "../pages/user/ViewListBooked/BookedCourtsTable.jsx";
import BookingDetail from "../components/player/BookHistory/BookingDetail.jsx";
import BookingDetailHost from "../components/host/BranchBookHistory/BookingDetailHost.jsx";
import BookingHistory from "../pages/player/BookHistory/BookingHistory.jsx";
import BookingHistoryHost from "../pages/host/BranchBookHistory/BookingHistoryHost.jsx";
import BookingTablePage from "../pages/user/BookingTable/BookingTable.jsx";
import BranDetailUser from "../pages/user/BranchDetail/BranDetailUser.jsx";
import BranchDetail from "../pages/guest/Branch/BranchDetail.jsx";
import BranchListPage from "../pages/user/ViewListBranch/BranchListPage.jsx";
import ChangePasswordPage from "../pages/auth/changePassword/ChangePasswordPage.jsx";
import Checkout from "../pages/player/Court/Checkout.jsx";
import ComparePage from "../components/host/court/ComparePage.jsx";
import CourtDetail from "../pages/guest/Court/CourtDetail.jsx";
import CourtDetailHost from "../pages/host/Court/CourtDetailHost.jsx";
import CreateBranch from "../pages/host/Branch/CreateBranch.jsx";
import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx";
import DashboardHost from "../pages/host/Dashboard/DashboardHost.jsx";
import DetailAttributeBranch from "../pages/admin/AttributeBranch/DetailAttributeBranch.jsx";
import DetailAttributeCourt from "../pages/admin/AttributeCourt/DetailAttributeCourt.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword.jsx";
import LandingPage from "../pages/common/LandingPage.jsx";
import ListAccount from "../pages/admin/ListAccount/ListAccount.jsx";
import ListAttributeBranch from "../pages/admin/AttributeBranch/ListAttributeBranch.jsx";
import ListAttributeCourt from "../pages/admin/AttributeCourt/ListAttributeCourt.jsx";
import ListBlog from "../pages/player/Blog/ListBlog.jsx";
import ListBranch from "../pages/guest/Branch/ListBranch.jsx";
import ListBranchAdmin from "../pages/admin/Branch/ListBranchAdmin.jsx";
import ListCourt from "../pages/guest/Court/ListCourt.jsx";
import ListReportBlog from "../pages/admin/ListReportBlog/ListReportBlog.jsx";
import Login from "../pages/auth/Login/Login.jsx";
import NotFound from "../pages/common/NotFound/NotFound.jsx";
import PostDetail from "../pages/user/PostDetail/PostDetail.jsx";
import PriceSetupPage from "../components/host/court/PriceSetupPage.jsx";
import PriceTypeCourtForm from "../components/host/typeCourt/PriceTypeCourtForm.jsx";
import Profile from "../pages/common/Profile.jsx";
import RequestListJoin from "../pages/user/RequestListJoin/RequestListJoin.jsx";
import SignUpFormHost from "../pages/auth/RegisterHost/SignUp.jsx";
import SignUpFormPlayer from "../pages/auth/RegisterUser/SignUp.jsx";
import TypeCourtTable from "../components/host/typeCourt/TypeCourtTable.jsx";
import UpdateBranch from "../pages/host/Branch/UpdateBranch.jsx";
import UpdateCourt from "../pages/host/Court/UpdateCourt.jsx";

const router = [
  {
    path: "/",
    name: "Trang chủ",
    component: <LandingPage />,
    role: ["GUEST", "USER"],
    layout: "",
  },
  {
    path: "/profile",
    name: "Hồ sơ cá nhân",
    component: <Profile />,
    role: ["USER", "HOST", "ADMIN"],
    layout: "",
  },
  {
    path: "/host/profile",
    name: "Hồ sơ cá nhân",
    component: <Profile />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/login",
    name: "Đăng nhập",
    component: <Login />,
    role: [],
    layout: "auth",
  },
  {
    path: "/sign-up-player",
    name: "Đăng ký người chơi",
    component: <SignUpFormPlayer />,
    role: [],
    layout: "auth",
  },
  {
    path: "/sign-up-host",
    name: "Đăng ký chủ sân",
    component: <SignUpFormHost />,
    role: [],
    layout: "auth",
  },
  {
    path: "/forgot-password",
    name: "Quên mật khẩu",
    component: <ForgotPassword />,
    role: [],
    layout: "auth",
  },
  {
    path: "/admin/branch-attribute",
    name: "Thuộc tính cơ sở",
    component: <ListAttributeBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/detail-branch-attribute/:id",
    name: "Chi tiết thuộc tính cơ sở",
    component: <DetailAttributeBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/court-attribute",
    name: "Thuộc tính sân đấu",
    component: <ListAttributeCourt />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/detail-court-attribute/:id",
    name: "Chi tiết thuộc tính sân đấu",
    component: <DetailAttributeCourt />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/change-password",
    name: "Thay đổi mật khẩu",
    component: <ChangePasswordPage />,
    role: ["USER", "HOST", "ADMIN"],
    layout: "auth",
  },
  {
    path: "/admin/list-account",
    name: "Danh sách tài khoản",
    component: <ListAccount />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/accept-branch",
    name: "Duyệt cơ sở",
    component: <AcceptBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/dashboard",
    name: "Thống kê",
    component: <Dashboard />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/host/list-branch",
    name: "Danh sách cơ sở",
    component: <ListBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/branch/:id",
    name: "Chi tiết cơ sở",
    component: <BranchDetail />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/update-branch/:id",
    name: "Cập nhật cơ sở",
    component: <UpdateBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/player/list-branch",
    name: "Danh sách cơ sở",
    component: <ListBranch />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/player/branch/:id",
    name: "Chi tiết cơ sở",
    component: <BranchDetail />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/create-branch",
    name: "Tạo cơ sở",
    component: <CreateBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/court/:id",
    name: "Danh sách sân đấu",
    component: <ListCourt />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/court/:id",
    name: "Danh sách sân đấu",
    component: <ListCourt />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/branch/:idBranch/court/:idCourt",
    name: "Chi tiết sân đấu",
    component: <CourtDetail />,
    role: ["GUEST", "HOST", "USER"],
    layout: "",
  },
  {
    path: "/host/branch/:idBranch/court/:idCourt",
    name: "Chi tiết sân đấu",
    component: <CourtDetailHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/player/checkout",
    name: "Checkout",
    component: <Checkout />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/update-court/:id",
    name: "Sửa sân đấu",
    component: <UpdateCourt />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/compare/:court1/:court2",
    name: "Compare Court",
    component: <ComparePage />,
    role: ["HOST"],
    layout: "",
  },
  {
    path: "/player/booking-history",
    name: "Lịch sử đặt sân",
    component: <BookingHistory />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/player/booking-history/:id",
    name: "Chi tiết lịch sử đặt sân",
    component: <BookingDetail />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/booking-history/:id",
    name: "Lịch sử đặt sân",
    component: <BookingHistoryHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/booking-history/detail/:id",
    name: "Chi tiết lịch sử đặt sân",
    component: <BookingDetailHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/404",
    name: "Not Found",
    component: <NotFound />,
    role: [],
    layout: "",
  },
  {
    path: "/booking-table",
    name: "Bảng đặt sân",
    component: <BookingTablePage />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/available-post",
    name: "Bài đăng tìm người chơi",
    component: <AvailableCourtPage />,
    role: ["GUEST", "USER"],
    layout: "",
  },
  {
    path: "/post/:id",
    name: "Chi tiết bài đăng tìm người chơi",
    component: <PostDetail />,
    role: ["GUEST", "USER"],
    layout: "",
  },
  {
    path: "/booked-courts",
    name: "Sân đấu đã đặt",
    component: <BookedCourts />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/search-courts",
    name: "Tìm sân đấu",
    component: <BranchListPage />,
    role: ["GUEST", "USER"],
    layout: "",
  },
  {
    path: "/user/branch/:id",
    name: "Chi tiết cơ sở",
    component: <BranDetailUser />,
    role: ["GUEST", "USER"],
    layout: "",
  },
  {
    path: "/admin/list-branch",
    name: "Danh sách cơ sở đã duyệt",
    component: <ListBranchAdmin />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/list-blog",
    name: "Danh sách bài đăng trạng thái",
    component: <ListBlog />,
    role: ["GUEST", "USER", "HOST"],
    layout: "",
  },
  {
    path: "/host/list-blog",
    name: "Danh sách bài đăng trạng thái",
    component: <ListBlog />,
    role: ["USER", "HOST"],
    layout: "host",
  },
  {
    path: "/host/dashboard",
    name: "Thống kê",
    component: <DashboardHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/price",
    name: "Cài đặt giá cho sân đấu",
    component: <PriceSetupPage />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/admin/report-blog",
    name: "Danh sách tố cáo bài đăng trạng thái",
    component: <ListReportBlog />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/request-list-join",
    name: "Lịch sử xin vào trận",
    component: <RequestListJoin />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/type-court-table",
    name: "Danh sách loại sân",
    component: <TypeCourtTable />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/price",
    name: "Bảng giá ",
    component: <PriceTypeCourtForm />,
    role: ["HOST"],
    layout: "host",
  },
];

export default router;
