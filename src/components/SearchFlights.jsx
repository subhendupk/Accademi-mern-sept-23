import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppData } from "../contexts/AppContext";
import jsonData from "../flights.json";

function SearchFlights() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const { setSearchInfo, setMatchedFlightsData } = useContext(AppData);

  const [oneWayOrRoundTrip, setOneWayOrRoundTrip] = useState("One Way");
  const [numberOfPerson, setNumberOfPerson] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [departurePlace, setDeparturePlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const [departurePlaceError, setDeparturePlaceError] = useState("");
  const [arrivalPlaceError, setArrivalPlaceError] = useState("");

  useEffect(() => {
    let searchInfoObj = {};

    searchInfoObj.oneWayOrRoundTrip = oneWayOrRoundTrip;
    searchInfoObj.numberOfPerson = numberOfPerson;
    searchInfoObj.selectedClass = selectedClass;

    searchInfoObj.departurePlace = departurePlace;

    searchInfoObj.arrivalPlace = arrivalPlace;

    searchInfoObj.departureDate = departureDate;

    if (departurePlace && arrivalPlace && departureDate) {
      setSearchInfo((currentValue) => {
        currentValue.splice(0);
        currentValue.push(searchInfoObj);
        return currentValue;
      });
    }
  }, [
    oneWayOrRoundTrip,
    numberOfPerson,
    selectedClass,
    departurePlace,
    arrivalPlace,
    departureDate,
  ]);

  const sendingDataToFlightList = () => {
    const matchedFlights = jsonData.filter((element) => {
      const departureCityFromJsonData = element.departure?.city;
      const departureAirPortFromJsonData = element.departure?.airport;

      const arrivalCityFromJsonData = element.arrival?.city;

      const arrivalAirPortFromJsonData = element.arrival?.airport;

      const departureDateFromJsonData = element.departure?.date;

      if (
        (departureCityFromJsonData === departurePlace ||
          departureAirPortFromJsonData === departurePlace) &&
        (arrivalCityFromJsonData === arrivalPlace ||
          arrivalAirPortFromJsonData === arrivalPlace) &&
        departureDateFromJsonData === departureDate
      ) {
        return element;
      }
    });

    if (matchedFlights.length > 0) {
      setMatchedFlightsData((currentValue) => {
        currentValue.splice(0);
        currentValue.push(...matchedFlights);
        return currentValue;
      });
    } else {
      setMatchedFlightsData([]);
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };
  const oneWayOrRoundTripHandler = (event) => {
    setOneWayOrRoundTrip(event.target.value);
  };
  const departurePlaceHandler = (event) => {
    setDeparturePlace(event.target.value);
  };
  const arrivalPlaceHandler = (event) => {
    setArrivalPlace(event.target.value);
  };
  const departureDateHandler = (event) => {
    setDepartureDate(event.target.value);
  };
  const searchFlightHandler = () => {
    let isValid = true;

    if (!departurePlace) {
      isValid = false;
      setDeparturePlaceError("Enter Departure Place");
    }
    if (!arrivalPlace) {
      isValid = false;
      setArrivalPlaceError("Enter Arrival Place");
    }
    if (isValid) {
      sendingDataToFlightList();
      goTo("/flight-lists");
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="searchBox  my-0 mx-auto mt-5">
          <h3 className="text-center">
            Enjoy Hassle free Bookings with FlightToFly
          </h3>

          <div className="card bg-info border-secondary mt-4">
            <div className="card-body ">
              <form>
                <div className="row">
                  <div className="col-4 mb-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={oneWayOrRoundTrip}
                      onChange={oneWayOrRoundTripHandler}
                    >
                      <option value="One Way">One Way</option>
                      <option value="Round Trip" disabled>
                        Round Trip
                      </option>
                    </select>
                  </div>

                  <div className="col-8 mb-3">
                    <div className="d-flex align-items-center">
                      <span>{numberOfPerson} Person</span>
                      <button
                        type="button"
                        className="btn btn-outline-info rounded-circle border-danger text-center mx-2 text-dark"
                        onClick={() => {
                          if (numberOfPerson > 1) {
                            setNumberOfPerson(numberOfPerson - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{numberOfPerson}</span>
                      <button
                        type="button"
                        className="btn btn-outline-info rounded-circle border-success text-center mx-2 text-dark"
                        onClick={() => {
                          setNumberOfPerson(numberOfPerson + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="travelClass">Class</label>
                    <select
                      className="form-control"
                      id="travelClass"
                      name="travelClass"
                      value={selectedClass}
                      onChange={handleClassChange}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business Class">Business Class</option>
                      <option value="First Class">First Class</option>
                    </select>
                  </div>

                  <div className="col-6 mb-3">
                    <label htmlFor="origin">From</label>
                    <input
                      type="text"
                      className="form-control"
                      id="origin"
                      name="origin"
                      placeholder="City"
                      value={departurePlace}
                      onChange={departurePlaceHandler}
                    />
                    <span>{departurePlaceError}</span>
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="destination">To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      name="destination"
                      placeholder="City"
                      value={arrivalPlace}
                      onChange={arrivalPlaceHandler}
                    />
                    <span>{arrivalPlaceError}</span>
                  </div>

                  <div className="col-8 mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="departureDate"
                      name="departureDate"
                      value={departureDate}
                      onChange={departureDateHandler}
                    />
                  </div>

                  <div className="d-grid col-4 mb-3">
                    <button
                      className="btn btn-warning  btn-block"
                      type="button"
                      onClick={searchFlightHandler}
                    >
                      Search Flights
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFlights;
