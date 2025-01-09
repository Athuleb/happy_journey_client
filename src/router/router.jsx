import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const TravelLandingPage = lazy(() => import("../Welcome"));
const LoginLayout = lazy(() => import("../Authentication/Login/LoginLayout"));
const PersonalLogin = lazy(() => import("../Authentication/Login/PersonalLogin"));
const BusinessLogin = lazy(() => import("../Authentication/Login/BusinessLogin"));
const ForgotPassword = lazy(() => import("../Authentication/Forgotpassword/ForgotPassword"));
const ForgotPassowrdLayout = lazy(() => import("../Authentication/Forgotpassword/ForgotPassowrdLayout"));
const ValidateOtp = lazy(() => import("../Authentication/Forgotpassword/ValidateOtp"));
const ResetPassword = lazy(() => import("../Authentication/Resetpassword/ResetPassword"));
const PersonalRegister = lazy(() => import("../Authentication/Register/PersonalRegister"));
const BusinessRegister = lazy(() => import("../Authentication/Register/BusinessRegister"));
const Mainlayout = lazy(() => import("../layout/Mainlayout"));
const ScrollDown = lazy(() => import("../modules/scrolldown/ScrollDown"));
const TopDestinstions = lazy(() => import("../modules/scrolldown/TopDestinations"));
const TravelScope = lazy(() => import("../modules/destinations/TravelScope"));
const Explore = lazy(() => import("../modules/explore/Explore"));
const SearchResult = lazy(() => import("../Search/SearchResult"));

const LazyLoading = ({ children }) => {
  return (
    <Suspense fallback={<CircularProgress size={20} />}>
      {children}
    </Suspense>
  );
};

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <LazyLoading>
        <TravelLandingPage />
      </LazyLoading>
    ),
  },
  {
    path: "login",
    element: (
      <LazyLoading>
        <LoginLayout />
      </LazyLoading>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoading>
            <PersonalLogin />
          </LazyLoading>
        ),
      },
      {
        path: "business-login",
        element: (
          <LazyLoading>
            <BusinessLogin />
          </LazyLoading>
        ),
      },
    ],
  },
  {
    path: "forgot-password",
    element: (
      <LazyLoading>
        <ForgotPassowrdLayout />
      </LazyLoading>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoading>
            <ForgotPassword />
          </LazyLoading>
        ),
      },
      {
        path: "validate",
        element: (
          <LazyLoading>
            <ValidateOtp />
          </LazyLoading>
        ),
      },
      {
        path: "reset-password",
        element: (
          <LazyLoading>
            <ResetPassword />
          </LazyLoading>
        ),
      },
    ],
  },
  {
    path: "/person-signup",
    element: (
      <LazyLoading>
        <PersonalRegister />
      </LazyLoading>
    ),
  },
  {
    path: "/business-signup",
    element: (
      <LazyLoading>
        <BusinessRegister />
      </LazyLoading>
    ),
  },
  {
    path: "/main",
    element: (
      <LazyLoading>
        <Mainlayout />
      </LazyLoading>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoading>
            <ScrollDown />
          </LazyLoading>
        ),
      },
      {
        path: "top-destinations",
        element: (
          <LazyLoading>
            <TopDestinstions />
          </LazyLoading>
        ),
      },
      {
        path: "travel-scope",
        element: (
          <LazyLoading>
            <TravelScope />
          </LazyLoading>
        ),
      },
      {
        path: "explore",
        element: (
          <LazyLoading>
            <Explore />
          </LazyLoading>
        ),
      },
      {
        path: "search",
        element: (
          <LazyLoading>
            <SearchResult />
          </LazyLoading>
        ),
      },
    ],
  },
]);

export default routes;
