import { useState } from "react";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AppData } from "./contexts/AppContext";

function App() {
  const [userData, setUserData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchInfo, setSearchInfo] = useState([]);
  const [matchedFlightsData, setMatchedFlightsData] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [payment, setPayment] = useState(false);
  const [bookingPageData, setBookingPageData] = useState([]);
  const [ticketID, setTicketID] = useState(null);
  const [history, setHistory] = useState([]);

  const isLoggedIn = () => {
    let data = localStorage.getItem("ff-data");
    if (data) {
      let loggedInD = JSON.parse(data);
      setLoggedIn(loggedInD.isLogin)
      return loggedInD.isLogin
    } else {
      return loggedIn
    }
  }
  const setIsLoggedIn = (value) => {
    localStorage.setItem("ff-data", JSON.stringify({ "isLogin": value }));
    setLoggedIn(value)
  }

  return (
    <>
      <AppData.Provider
        value={{
          userData,
          setUserData,
          searchInfo,
          setSearchInfo,
          matchedFlightsData,
          setMatchedFlightsData,
          flightNumber,
          setFlightNumber,
          payment,
          bookingPageData,
          setBookingPageData,
          ticketID,
          setTicketID,
          setPayment,
          history,
          setHistory,
        }}
      >
        <RouterProvider router={router} />
      </AppData.Provider>
    </>
  );
}

export default App;
