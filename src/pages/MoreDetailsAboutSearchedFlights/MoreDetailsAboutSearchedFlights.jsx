import React, { useContext, useEffect } from "react";
import { AppData } from "../../contexts/AppContext";
import jsonData from "../../flights.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MoreDetailsAboutSearchedFlights() {
  const { flightNumber, setFlightNumber, searchInfo } =
    useContext(AppData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };
  let flightObject = jsonData.find((element) => {
    if (element.flightNumber === flightNumber) {
      return true;
    }
  });

  useEffect(() => {
    if (!flightObject) {
      document.getElementById("ifNoData").innerHTML = "No Details to Show";
    }
  }, [flightObject]);

  let classFromSearchInfoObjInLowerCase = searchInfo[0]?.selectedClass
    .replace(/\s+/g, "")
    .toLowerCase();

  const goBackToFlightListPage = () => {
    goTo("/flight-lists");
  };
  const goToBookPage = (flightNumber) => {
    if (isLoggedIn === true) {
      setFlightNumber(flightNumber);
      goTo("/booking");
    } else {
      goTo("/auth/login");
    }
  };
  return (
    <div className="container my-5">
      <h1>Flight Details</h1>
      <div className="container" id="ifNoData">
        <table className="table ">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Flight Number</th>
              <td scope="row">{flightObject?.flightNumber}</td>
            </tr>
            <tr>
              <th scope="row">Air Line</th>
              <td scope="row">{flightObject?.airline}</td>
            </tr>
            <tr>
              <th scope="row">Departure Airport</th>
              <td scope="row">{flightObject?.departure?.airport}</td>
            </tr>
            <tr>
              <th scope="row">Departure City</th>
              <td scope="row">{flightObject?.departure?.city}</td>
            </tr>
            <tr>
              <th scope="row">Departure Country</th>
              <td scope="row">{flightObject?.departure?.country}</td>
            </tr>
            <tr>
              <th scope="row">Departure Date</th>
              <td scope="row">{flightObject?.departure?.date}</td>
            </tr>
            <tr>
              <th scope="row">Departure Time</th>
              <td scope="row">{flightObject?.departure?.time}</td>
            </tr>
            <tr>
              <th scope="row">Arrival Airport</th>
              <td scope="row">{flightObject?.arrival?.airport}</td>
            </tr>
            <tr>
              <th scope="row">Arrival City</th>
              <td scope="row">{flightObject?.arrival?.city}</td>
            </tr>
            <tr>
              <th scope="row">Arrival Country</th>
              <td scope="row">{flightObject?.arrival?.country}</td>
            </tr>
            <tr>
              <th scope="row">Arrival Date</th>
              <td scope="row">{flightObject?.arrival?.date}</td>
            </tr>
            <tr>
              <th scope="row">Arrival Time</th>
              <td scope="row">{flightObject?.arrival?.time}</td>
            </tr>
            <tr>
              <th scope="row">Duration</th>
              <td scope="row">{flightObject?.duration}</td>
            </tr>
            <tr>
              <th scope="row">Class</th>
              <td scope="row">{searchInfo[0]?.selectedClass}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td scope="row">
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.price?.currency
                }{" "}
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.price?.amount
                }
              </td>
            </tr>
            <tr>
              <th scope="row">Baggage</th>
              <td scope="row">
                {"Checked: "}
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.baggage?.checked
                }
                {" and Carry On: "}
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.baggage?.carryOn
                }
              </td>
            </tr>
            <tr>
              <th scope="row">Meal</th>
              <td scope="row">
                {" "}
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.meal
                }
              </td>
            </tr>
            <tr>
              <th scope="row">WiFi</th>
              <td scope="row">
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.wifi
                }
              </td>
            </tr>
            <tr>
              <th scope="row">Seat Selection</th>
              <td scope="row">
                {
                  flightObject?.classStatus[classFromSearchInfoObjInLowerCase]
                    ?.seatSelection
                }
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttons text-center my-5 row">
          <button
            type="button"
            className="btn btn-secondary btn-lg mx-2 col"
            onClick={goBackToFlightListPage}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg mx-2 col"
            onClick={() => {
              goToBookPage(flightNumber);
            }}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreDetailsAboutSearchedFlights;
