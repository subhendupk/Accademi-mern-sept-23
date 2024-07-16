import React, { useContext, useEffect } from "react";
import { AppData } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function MoreDetailsAboutBookedFlight() {
  const { history, ticketID } = useContext(AppData);

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  const ticketObject = history.find((element, index) => {
    if (element.ticketId === ticketID) {
      return true;
    }
  });
  const goBackToHistory = () => {
    goTo("/history");
  };
  useEffect(() => {
    if (!ticketObject) {
      document.getElementById("ifNoData").innerHTML = "No Details to Show";
    }
  }, [ticketObject]);

  return (
    <div>
      <div className="container my-5">
        <h1>Ticket Details</h1>
        <div className="container " id="ifNoData">
          <table className="table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Ticket Id</th>
                <td scope="row">{ticketObject?.ticketId}</td>
              </tr>
              <tr>
                <th scope="row">Booking Date</th>
                <td scope="row">
                  {new Date(ticketObject?.ticketBookingDate).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope="row">Flight Number</th>
                <td scope="row">{ticketObject?.flightNumber}</td>
              </tr>
              <tr>
                <th scope="row">Air Line</th>
                <td scope="row">{ticketObject?.airline}</td>
              </tr>
              <tr>
                <th scope="row">Departure Airport</th>
                <td scope="row">{ticketObject?.departureAirport}</td>
              </tr>
              <tr>
                <th scope="row">Departure City</th>
                <td scope="row">{ticketObject?.departureCity}</td>
              </tr>
              <tr>
                <th scope="row">Departure Country</th>
                <td scope="row">{ticketObject?.departureCountry}</td>
              </tr>
              <tr>
                <th scope="row">Departure Date</th>
                <td scope="row">{ticketObject?.departureDate}</td>
              </tr>
              <tr>
                <th scope="row">Departure Time</th>
                <td scope="row">{ticketObject?.departureTime}</td>
              </tr>
              <tr>
                <th scope="row">Arrival Airport</th>
                <td scope="row">{ticketObject?.arrivalAirport}</td>
              </tr>
              <tr>
                <th scope="row">Arrival City</th>
                <td scope="row">{ticketObject?.arrivalCity}</td>
              </tr>
              <tr>
                <th scope="row">Arrival Country</th>
                <td scope="row">{ticketObject?.arrivalCountry}</td>
              </tr>
              <tr>
                <th scope="row">Arrival Date</th>
                <td scope="row">{ticketObject?.arrivalDate}</td>
              </tr>
              <tr>
                <th scope="row">Arrival Time</th>
                <td scope="row">{ticketObject?.arrivalTime}</td>
              </tr>
              <tr>
                <th scope="row">Duration</th>
                <td scope="row">{ticketObject?.duration}</td>
              </tr>
              <tr>
                <th scope="row">Number of Traveller</th>
                <td scope="row">{ticketObject?.noOfTraveller}</td>
              </tr>
              <tr>
                <th scope="row">Class</th>
                <td scope="row">{ticketObject?.classStatus?.class}</td>
              </tr>
              <tr>
                <th scope="row">Price/Person</th>
                <td scope="row">
                  {ticketObject?.classStatus?.price?.currency}{" "}
                  {ticketObject?.classStatus?.price?.amount}
                </td>
              </tr>
              <tr>
                <th scope="row">Total Price</th>
                <td scope="row">
                  {ticketObject?.classStatus?.price?.currency}{" "}
                  {parseInt(ticketObject?.classStatus?.price?.amount, 10) *
                    parseInt(ticketObject?.noOfTraveller, 10)}
                </td>
              </tr>
              <tr>
                <th scope="row">Baggage</th>
                <td scope="row">
                  {"Checked: "}
                  {ticketObject?.classStatus?.baggage?.checked}
                  {" and Carry On: "}
                  {ticketObject?.classStatus?.baggage?.carryOn}
                </td>
              </tr>
              <tr>
                <th scope="row">Meal</th>
                <td scope="row"> {ticketObject?.classStatus?.meal}</td>
              </tr>
              <tr>
                <th scope="row">WiFi</th>
                <td scope="row">{ticketObject?.classStatus?.wifi}</td>
              </tr>
              <tr>
                <th scope="row">Seat Selection</th>
                <td scope="row">
                  {ticketObject?.classStatus?.seatSelection}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Email</th>
                <td scope="row">{ticketObject?.contactDetails?.email}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number</th>
                <td scope="row">
                  {ticketObject?.contactDetails?.phoneNumber}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Person</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {ticketObject?.travellerInformation?.map((person, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">Person {index + 1}</th>
                    <td>{person?.name}</td>
                    <td>{person?.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="buttons text-center my-5 row">
            <button
              type="button"
              className="btn btn-secondary btn-lg mx-2 col"
              onClick={goBackToHistory}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreDetailsAboutBookedFlight;
