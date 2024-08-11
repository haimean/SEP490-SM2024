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
import UpdateCourt from "../pages/host/Court/UpdateCourt.jsx";
import ComparePage from "../components/host/court/ComparePage.jsx";
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
import BookingHistoryHost from "../pages/host/BranchBookHistory/BookingHistoryHost.jsx";
import BookingDetailHost from "../components/host/BranchBookHistory/BookingDetailHost.jsx";
import ListBranchAdmin from "../pages/admin/Branch/ListBranchAdmin.jsx";
import ListBlog from "../pages/player/Blog/ListBlog.jsx";
import DashboardHost from "../pages/host/Dashboard/DashboardHost.jsx";
import PriceSetupPage from "../components/host/court/PriceSetupPage.jsx";
import ListReportBlog from "../pages/admin/ListReportBlog/ListReportBlog.jsx";
import RequestListJoin from "../pages/user/RequestListJoin/RequestListJoin.jsx";
import TypeCourtTable from "../components/host/typeCourt/TypeCourtTable.jsx";
import PriceTypeCourtForm from "../components/host/typeCourt/PriceTypeCourtForm.jsx";

const router = [
  {
    path: "/",
    name: "Landing Page",
    component: <LandingPage />,
    role: [],
    layout: "",
  },
  {
    path: "/profile",
    name: "Profile",
    component: <Profile />,
    role: ["USER", "HOST", "ADMIN"],
    layout: "",
  },
  {
    path: "/host/profile",
    name: "Profile",
    component: <Profile />,
    role: ["USER", "HOST", "ADMIN"],
    layout: "host",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    role: [],
    layout: "auth",
  },
  {
    path: "/sign-up-player",
    name: "Sign Up Player",
    component: <SignUpFormPlayer />,
    role: [],
    layout: "auth",
  },
  {
    path: "/sign-up-host",
    name: "Sign Up Host",
    component: <SignUpFormHost />,
    role: [],
    layout: "auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: <ForgotPassword />,
    role: [],
    layout: "auth",
  },
  {
    path: "/admin/branch-attribute",
    name: "Branch Attribute",
    component: <ListAttributeBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/detail-branch-attribute/:id",
    name: "Detail Branch Attribute",
    component: <DetailAttributeBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/court-attribute",
    name: "Court Attribute",
    component: <ListAttributeCourt />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/detail-court-attribute/:id",
    name: "Detail Court Attribute",
    component: <DetailAttributeCourt />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: <ChangePasswordPage />,
    role: ["USER", "HOST", "ADMIN"],
    layout: "auth",
  },
  {
    path: "/admin/list-account",
    name: "List Account",
    component: <ListAccount />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/accept-branch",
    name: "Accept Branch",
    component: <AcceptBranch />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/host/list-branch",
    name: "List Branch",
    component: <ListBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/branch/:id",
    name: "Branch Detail",
    component: <BranchDetail />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/update-branch/:id",
    name: "Update Branch",
    component: <UpdateBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/player/list-branch",
    name: "List Branch",
    component: <ListBranch />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/player/branch/:id",
    name: "Branch Detail",
    component: <BranchDetail />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/host/create-branch",
    name: "Create Branch",
    component: <CreateBranch />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/court/:id",
    name: "Court List",
    component: <ListCourt />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/branch/:idBranch/court/:idCourt",
    name: "Court Detail",
    component: <CourtDetail />,
    role: [],
    layout: "",
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
    name: "Update Court",
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
    role: [],
    layout: "",
  },
  {
    path: "/waiting-list",
    name: "Waiting List",
    component: <WaitingList />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/booking-table",
    name: "Booking Table",
    component: <BookingTablePage />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/available-post",
    name: "Available Post",
    component: <AvailableCourtPage />,
    role: [],
    layout: "",
  },
  {
    path: "/post/:id",
    name: "Post Detail",
    component: <PostDetail />,
    role: [],
    layout: "",
  },
  {
    path: "/booked-courts",
    name: "Booked Courts",
    component: <BookedCourts />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/search-courts",
    name: "Search Courts",
    component: <BranchListPage />,
    role: [],
    layout: "",
  },
  {
    path: "/user/branch/:id",
    name: "Branch Detail User",
    component: <BranDetailUser />,
    // role: ["HOST", "USER", "ADMIN"],
    layout: "",
  },
  {
    path: "/booking-page",
    name: "Booking Page",
    component: <BookingPage />,
    role: ["HOST"],
    layout: "",
  },
  {
    path: "/booking-test",
    name: "Booking Page",
    component: <TestBookingPage />,
    role: ["HOST"],
    layout: "",
  },
  {
    path: "/booking-calendar",
    name: "Booking Page",
    component: <BookingCalendar />,
    role: ["HOST"],
    layout: "",
  },
  {
    path: "/admin/list-branch",
    name: "List Branch Admin",
    component: <ListBranchAdmin />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/list-blog",
    name: "List Blog",
    component: <ListBlog />,
    role: ["USER", "HOST"],
    layout: "",
  },
  {
    path: "/host/list-blog",
    name: "List Blog",
    component: <ListBlog />,
    role: ["USER", "HOST"],
    layout: "host",
  },
  {
    path: "/host/dashboard",
    name: "Dashboard",
    component: <DashboardHost />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/host/price",
    name: "Price set up page",
    component: <PriceSetupPage />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/admin/report-blog",
    name: "List Report Blog",
    component: <ListReportBlog />,
    role: ["ADMIN"],
    layout: "admin",
  },
  {
    path: "/request-list-join",
    name: "Request List Join",
    component: <RequestListJoin />,
    role: ["USER"],
    layout: "",
  },
  {
    path: "/type-court-table",
    name: "Type Court Table",
    component: <TypeCourtTable />,
    role: ["HOST"],
    layout: "host",
  },
  {
    path: "/price",
    name: "Price Type Court Form",
    component: <PriceTypeCourtForm />,
    role: ["HOST"],
    layout: "host",
  },
];

export default router;
