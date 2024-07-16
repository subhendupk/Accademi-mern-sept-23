import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchFlights from "../../components/SearchFlights";
import { AppData } from "../../contexts/AppContext";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function FlightList() {
  const { searchInfo, matchedFlightsData, setFlightNumber } =
    useContext(AppData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  let searchInfoObj = searchInfo[0];
  let classFromSearchInfoObjInLowerCase = searchInfoObj?.selectedClass
    .replace(/\s+/g, "")
    .toLowerCase();

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  const searchedFlightDetails = (flightNumber) => {
    setFlightNumber(flightNumber);
    goTo("/more-details-about-searched-flight");
  };
  const tobookFlight = (flightNumber) => {
    if (isLoggedIn === true) {
      setFlightNumber(flightNumber);
      goTo("/booking");
    } else {
      goTo("/auth/login");
    }
  };

  return (
    <div className="container">
      <SearchFlights />
      <div className="text-center my-5">
        <h2 className="mb-4">
          {matchedFlightsData.length > 0
            ? `Available Flights`
            : `Available Flights Will Be Shown Here`}
        </h2>

        <table className="table border rounded">
          <thead>
            <tr>
              <th scope="col">Flight No</th>
              <th scope="col">Air Line</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Duration</th>
              <th scope="col">Class</th>
              <th scope="col">Price</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {matchedFlightsData.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.departure.time}</td>
                <td>{flight.arrival.time}</td>
                <td>{flight.duration}</td>
                <td>
                  {" "}
                  {
                    flight.classStatus[classFromSearchInfoObjInLowerCase]
                      ?.class
                  }
                </td>
                <td>
                  {
                    flight.classStatus[classFromSearchInfoObjInLowerCase]
                      .price.currency
                  }{" "}
                  {
                    flight.classStatus[classFromSearchInfoObjInLowerCase]
                      .price.amount
                  }
                </td>
                <td>
                  <Button
                    className="mx-2 bg-info"
                    onClick={() => searchedFlightDetails(flight.flightNumber)}
                  >
                    Details
                  </Button>
                  <Button
                    className="mx-2"
                    onClick={() => tobookFlight(flight.flightNumber)}
                  >
                    Book
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightList;
