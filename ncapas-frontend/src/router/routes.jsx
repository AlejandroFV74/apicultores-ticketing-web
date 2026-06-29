import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../features/landingPage/LandingPage";
import { SeatMap } from "../features/eventMap/SeatMap";
import LoginPage from "../features/auth/loginPage/LoginPage";
import RegisterPage from "../features/auth/registerpage/RegisterPage";
import MyTicketsPage from "../features/purchaseTickets/MyTicketsPage";
import EventDetailPage from "../features/eventDetail/EventDetailPage";
import OrganizerEventsPage from "../features/eventOrganizer/OrganizerEventsPage";
import CreateEventPage from "../features/eventOrganizer/CreateEventPage";
import EditEventPage from "../features/eventOrganizer/EditEventPage";
import ReservationConfirmationPage from "../features/purchaseTickets/ReservationConfirmationPage";
import PaymentSelectionPage from "../features/purchaseTickets/PaymentSelectionPage";
import TicketScannerPage from "../features/ticketScanner/TicketScannerPage";
import HistoryTicketsPage from "../features/ticketsHistory/HistoryTickets";
import DashboardPage from "../features/admindashboard/DashboardPage"; 

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
    path: "/events/:eventId",
    element: <EventDetailPage />,
  },
  {
    path: "/eventmap/",
    element: <SeatMap />,
  },
  {
    path: "/reservation/confirmation/:eventId",
    element: <ReservationConfirmationPage />,
  },
  {
    path: "/payment/:eventId",
    element: <PaymentSelectionPage />,
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
    path: "/tickets/scan",
    element: <TicketScannerPage />,
  },
  {
    path: "/organizer",
    element: <OrganizerEventsPage />,
  },
  {
    path: "/organizer/tickets/scan",
    element: <TicketScannerPage />,
  },
  {
    path: "/organizer/events",
    element: <OrganizerEventsPage />,
  },
  {
    path: "/organizer/events/edit",
    element: <OrganizerEventsPage />,
  },
  {
    path: "/organizer/events/create",
    element: <CreateEventPage />,
  },
  {
    path: "/organizer/create",
    element: <CreateEventPage />,
  },
  {
    path: "/organizer/events/:eventId/edit",
    element: <EditEventPage />,
  },
  {
    path: "/history",
    element: <HistoryTicketsPage />
  },
    path: "/dashboard",
    element: <DashboardPage />,  
  }
]);
