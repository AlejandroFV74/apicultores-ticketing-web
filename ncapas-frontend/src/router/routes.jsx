import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../features/landingPage/LandingPage";
import { SeatMap } from "../features/eventMap/SeatMap";
import LoginPage from "../features/auth/loginPage/LoginPage";
import RegisterPage from "../features/auth/registerpage/RegisterPage";
import MyTicketsPage from "../features/purchaseTickets/MyTicketsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/eventmap/:eventId",
    element: <SeatMap />,
  },
  {
    path: "/eventmap/",
    element: <SeatMap />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/mytickets",
    element: <MyTicketsPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);