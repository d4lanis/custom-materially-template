import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));
const AuthChangePassword = Loadable(lazy(() => import('../views/ChangePassword')));
const AuthForgotPassword = Loadable(lazy(() => import('../views/ForgotPassword')));

// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/auth/login',
      element: <AuthLogin />
    },
    {
      path: '/auth/register',
      element: <AuthRegister />
    },
    {
      path: '/auth/change-password',
      element: <AuthChangePassword />
    },
    {
      path: '/auth/forgot-password',
      element: <AuthForgotPassword />
    }
  ]
};

export default AuthenticationRoutes;
