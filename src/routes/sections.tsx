import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from '../theme/styles';
import { AuthLayout } from '../layouts/auth';
import { DashboardLayout } from '../layouts/dashboard';
import Ifsc from '../sections/overview/ifsc_code/ifsc-code';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('../pages/home'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserPage = lazy(() => import('../pages/user'));
export const SignInPage = lazy(() => import('../pages/sign-in'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <HomePage />, index: true },
        { element: <HomePage />, index: true },
        { path: 'ifsc', element: <Ifsc /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    { path: '/', element: <Ifsc /> },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}