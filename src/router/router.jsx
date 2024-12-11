import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import TravelScope from "../modules/destinations/TravelScope";
import ScrollDown from "../modules/scrolldown/ScrollDown";
import Explore from "../modules/explore/Explore";
import SearchResult from "../Search/SearchResult";
import LoginLayout from "../Authentication/Login/LoginLayout";
import PersonalLogin from "../Authentication/Login/PersonalLogin";
import BusinessLogin from "../Authentication/Login/BusinessLogin";
import TravelLandingPage from "../Landingpage";
import PersonalRegister from "../Authentication/Register/PersonalRegister";
import BusinessRegister from "../Authentication/Register/BusinessRegister";



const route = createBrowserRouter([
  {
    path: "/", // Root path
    element: <TravelLandingPage />,
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <PersonalLogin />,
      },
      {
        path: "business-login",
        element: <BusinessLogin />,
      },
    ],
  },
  {
    path: '/person-signup',
    element: <PersonalRegister />
  }, 
  {
    path:'/business-signup',
    element:<BusinessRegister/>
  },

  {
    path: "/main",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <ScrollDown />,
      },
      {
        path: "travel-scope",
        element: <TravelScope />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "search",
        element: <SearchResult />,
      },
    ],
  },
],
);

export default route;
