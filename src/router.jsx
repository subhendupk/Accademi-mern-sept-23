import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import FlightList from "./pages/FlightList/FlightList";
import MoreDetailsAboutSearchedFlights from "./pages/MoreDetailsAboutSearchedFlights/MoreDetailsAboutSearchedFlights";
import MoreDetailsAboutBookedFlight from "./pages/MoreDetailsAboutBookedFlight/MoreDetailsAboutBookedFlight";
import Booking from "./pages/Booking/Booking";
import Payment from "./pages/Payment/Payment";
import History from "./pages/History/History";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import WithAuth from "./auth/WithAuth";
import UnAuth from "./auth/UnAuth";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search-flights",
        element: <Search />,
      },
      {
        path: "/flight-lists",
        element: <FlightList />,
      },
      {
        path: "/more-details-about-searched-flight",
        element: <MoreDetailsAboutSearchedFlights />,
      },
      {
        path: "/more-details-about-booked-flight",
        element: <MoreDetailsAboutBookedFlight />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/history",
        element: <WithAuth><History /></WithAuth>,
      },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <UnAuth><Signup /></UnAuth>,
      },
      {
        path: "login",
        element: <UnAuth><Login /></UnAuth>,
      },
    ]
  }

];

const router = createBrowserRouter(routes);
export default router;
