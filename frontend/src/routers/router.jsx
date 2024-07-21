import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword.jsx";
import Login from "../pages/auth/Login/Login.jsx";
import SignUpFormPlayer from "../pages/auth/RegisterUser/SignUp.jsx";
import SignUpFormHost from "../pages/auth/RegisterHost/SignUp.jsx";
import ListAttributeBranch from "../pages/admin/AttributeBranch/ListAttributeBranch.jsx";
import DetailAttributeBranch from "../pages/admin/AttributeBranch/DetailAttributeBranch.jsx";
import ListAttributeCourt from "../pages/admin/AttributeCourt/ListAttributeCourt.jsx";
import DetailAttributeCourt from "../pages/admin/AttributeCourt/DetailAttributeCourt.jsx";
import LandingPage from "../pages/common/LandingPage.jsx";
import Profile from "../pages/common/Profile.jsx";
import ChangePasswordPage from "../pages/auth/changePassword/ChangePasswordPage.jsx";
import ListAccount from "../pages/admin/ListAccount/ListAccount.jsx";
import NotFound from "../pages/common/NotFound/NotFound.jsx";
import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx";
import CreateBranch from "../pages/host/Branch/CreateBranch.jsx";
import Checkout from "../pages/player/Court/Checkout.jsx";
import RegisterCourt from "../pages/host/Court/RegisterCourt.jsx";
import UpdateCourt from "../pages/host/Court/UpdateCourt.jsx";
import CreateBlog from "../pages/player/Blog/CreateBlog.jsx";
import ComparePage from "../components/host/court/ComparePage.jsx";
import Notification from "../pages/notification.jsx";
import BookingHistory from "../pages/player/BookHistory/BookingHistory.jsx";
import BookingDetail from "../components/player/BookHistory/BookingDetail.jsx";
import ListBranch from "../pages/guest/Branch/ListBranch.jsx";
import BranchDetail from "../pages/guest/Branch/BranchDetail.jsx";
import ListCourt from "../pages/guest/Court/ListCourt.jsx";
import CourtDetail from "../pages/guest/Court/CourtDetail.jsx";
import UpdateBranch from "../pages/host/Branch/UpdateBranch.jsx";
import WaitingList from "../pages/user/WaitingList/WaitingList.jsx";
import BookingTablePage from "../pages/user/BookingTable/BookingTable.jsx";
import AvailableCourtPage from "../pages/user/AvailableCourt/AvailableCourt.jsx";
import AcceptBranch from "../components/admin/AcceptBranch/AcceptBranch.jsx";
import PostDetail from "../pages/user/PostDetail/PostDetail.jsx";
import BookedCourts from "../pages/user/ViewListBooked/BookedCourtsTable.jsx";
import BranchListPage from "../pages/user/ViewListBranch/BranchListPage.jsx";
import BranDetailUser from "../pages/user/BranchDetail/BranDetailUser.jsx";
import BookingPage from "../pages/user/Booking/BookingPage.jsx";
import TestBookingPage from "../pages/user/Booking/TestBookingPage.jsx";
import BookingCalendar from "../components/user/BookingTable/BookingCalendar.jsx";
import RegisterTypeCourt from "../pages/host/TypeCourt/CreateTypeCourt.jsx";
import BookingHistoryHost from "../pages/host/BranchBookHistory/BookingHistoryHost.jsx";
import BookingDetailHost from "../components/host/BranchBookHistory/BookingDetailHost.jsx";

const router = [
  {
    path: "/",
    name: "Landing Page",
    component: <LandingPage />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/profile",
    name: "Profile",
    component: <Profile />,
    role: ["USER", "HOST", "ADMIN"], // Cho phép cả USER, HOST và ADMIN truy cập
    layout: "",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    role: [], // Không yêu cầu đăng nhập
    layout: "auth",
  },
  {
    path: "/sign-up-player",
    name: "Sign Up Player",
    component: <SignUpFormPlayer />,
    role: [], // Không yêu cầu đăng nhập
    layout: "auth",
  },
  {
    path: "/sign-up-host",
    name: "Sign Up Host",
    component: <SignUpFormHost />,
    role: [], // Không yêu cầu đăng nhập
    layout: "auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: <ForgotPassword />,
    role: [], // Không yêu cầu đăng nhập
    layout: "auth",
  },
  {
    path: "/admin/branch-attribute",
    name: "Branch Attribute",
    component: <ListAttributeBranch />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/admin/detail-branch-attribute/:id",
    name: "Detail Branch Attribute",
    component: <DetailAttributeBranch />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/admin/court-attribute",
    name: "Court Attribute",
    component: <ListAttributeCourt />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/admin/detail-court-attribute/:id",
    name: "Detail Court Attribute",
    component: <DetailAttributeCourt />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: <ChangePasswordPage />,
    role: ["USER", "HOST", "ADMIN"], // Cho phép cả USER, HOST và ADMIN truy cập
    layout: "auth",
  },
  {
    path: "/admin/list-account",
    name: "List Account",
    component: <ListAccount />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/admin/accept-branch",
    name: "Accept Branch",
    component: <AcceptBranch />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    role: ["ADMIN"], // Chỉ cho phép ADMIN truy cập
    layout: "admin",
  },
  {
    path: "/host/list-branch",
    name: "List Branch",
    component: <ListBranch />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/host/branch/:id",
    name: "Branch Detail",
    component: <BranchDetail />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/host/update-branch/:id",
    name: "Update Branch",
    component: <UpdateBranch />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/player/list-branch",
    name: "List Branch",
    component: <ListBranch />,
    // role: ["USER"], // Chỉ cho phép USER truy cập
    layout: "",
  },
  {
    path: "/player/branch/:id",
    name: "Branch Detail",
    component: <BranchDetail />,
    // role: ["USER"], // Chỉ cho phép USER truy cập
    layout: "",
  },
  {
    path: "/host/create-branch",
    name: "Create Branch",
    component: <CreateBranch />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/court/:id",
    name: "Court List",
    component: <ListCourt />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/branch/:idBranch/court/:idCourt",
    name: "Court Detail",
    component: <CourtDetail />,
    // role: ["USER"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/player/checkout",
    name: "Checkout",
    component: <Checkout />,
    // role: ["USER"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/player/create-blog",
    name: "Create Blog",
    component: <CreateBlog />,
    // role: ["USER"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/host/register-court",
    name: "Register Court",
    component: <RegisterCourt />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/host/update-court/:id",
    name: "Update Court",
    component: <UpdateCourt />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/compare/:court1/:court2",
    name: "Compare Court",
    component: <ComparePage />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/player/booking-history",
    name: "Booking History",
    component: <BookingHistory />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/player/booking-history/:id",
    name: "Booking History Detail",
    component: <BookingDetail />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/booking-history/:id",
    name: "Booking History for Host",
    component: <BookingHistoryHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/booking-history/detail/:id",
    name: "Booking History Detail for Host",
    component: <BookingDetailHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/404",
    name: "Not Found",
    component: <NotFound />,
    role: [], // Không yêu cầu đăng nhập
    layout: "",
  },
  {
    path: "/notification",
    name: "Notification",
    component: <Notification />,
    layout: "",
  },
  {
    path: "/waiting-list",
    name: "Waiting List",
    component: <WaitingList />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/booking-table",
    name: "Booking Table",
    component: <BookingTablePage />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/available-court",
    name: "Available Court",
    component: <AvailableCourtPage />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/post/:id",
    name: "Post Detail",
    component: <PostDetail />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/booked-courts",
    name: "Booked Courts",
    component: <BookedCourts />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/search-courts",
    name: "Search Courts",
    component: <BranchListPage />,
    // role: ["USER"],
    layout: "",
  },
  {
    path: "/user/branch/:id",
    name: "Branch Detail User",
    component: <BranDetailUser />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/booking-page",
    name: "Booking Page",
    component: <BookingPage />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/host/create-type-court",
    name: "Create Type Court",
    component: <RegisterTypeCourt />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "host",
  },
  {
    path: "/booking-test",
    name: "Booking Page",
    component: <TestBookingPage />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
  {
    path: "/booking-calendar",
    name: "Booking Page",
    component: <BookingCalendar />,
    // role: ["HOST"], // Chỉ cho phép HOST truy cập
    layout: "",
  },
];

export default router;
