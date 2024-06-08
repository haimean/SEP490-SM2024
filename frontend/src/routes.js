import ForgotPassword from './pages/common/forgotPassword/ForgotPassword.js';
import Login from "./pages/common/login/Login.js";
import SignUpFormPlayer from './pages/player/signUp/SignUp.js';
import ListAttributeBranch from './pages/admin/ListAttributeBranch.js';
import CreateAttributeBranch from './pages/admin/CreateAttributeBranch.js';
import DetailAttributeBranch from './pages/admin/DetailAttributeBranch.js';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login/>,
    role: '',
    layout: ''
  },
  {
    path: '/sign-up-player',
    name: 'Sign Up Player',
    component: <SignUpFormPlayer/>,
    role: 'player',
    layout: ''
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: <ForgotPassword/>,
    role: '',
    layout: ''
  },
  {
    path: '/branch-attribute',
    name: 'Branch Attribute',
    component: <ListAttributeBranch/>,
    role: 'admin',
    layout: ''
  },
  {
    path: '/detail-branch-attribute/:id',
    name: 'Detail Branch Attribute',
    component: <DetailAttributeBranch />,
    role: 'admin',
    layout: ''
  },
  {
    path: '/create-branch-attribute',
    name: 'Create Branch Attribute',
    component: <CreateAttributeBranch/>,
    role: 'admin',
    layout: ''
  },
];

export default routes;