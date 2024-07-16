import React, { useContext, useEffect, useState } from "react";
import { AppData } from "../../contexts/AppContext";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function History() {
  const { history, setHistory, setTicketID } = useContext(AppData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (history.length === 0) {
      document.getElementById("ifNoTicketBooked").innerHTML = "No Data to Show";
    }
  }, [history]);

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);

  const deleteHandler = (id) => {
    setId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteConfermationHandler = () => {
    let filteredHistory = history.filter((ticketObj, index) => {
      if (ticketObj.ticketId == id) {
        return false;
      }
    });

    setHistory((currentHistory) => {
      currentHistory.splice(0);
      currentHistory.push(...filteredHistory);
      return currentHistory;
    });
    setShow(false);
  };

  const goToDetailsPage = (ticketId) => {
    if (isLoggedIn === true) {
      setTicketID(ticketId);
      goTo("/more-details-about-booked-flight");
    }
  };

  const newFlightBook = () => {
    goTo("/search-flights");
  };
  return (
    <div className=" text-center mt-5">
      <h1>Your Journey</h1>
      <div className="tableContainer">
        <table
          className="table border table-dark table-striped-columns table-hover mt-5"
          id="ifNoTicketBooked"
        >
          <thead>93
            <tr>
              <th className="border" scope="col">
                Ticket ID
              </th>
              <th className="border" scope="col">
                Booking Date
              </th>
              <th className="border" scope="col">
                From
              </th>
              <th className="border" scope="col">
                To
              </th>
              <th className="border" scope="col">
                Date
              </th>
              <th className="border" scope="col">
                Departure Time
              </th>
              <th className="border" scope="col">
                Travellers
              </th>
              <th className="border" scope="col">
                Class
              </th>
              <th className="border" scope="col">
                Price/Person
              </th>
              <th className="border" scope="col">
                Total Price
              </th>
              <th className="border" scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.ticketId}</td>
                <td>{new Date(ticket.ticketBookingDate).toLocaleString()}</td>

                <td>
                  {ticket.departureAirport}
                  {","}
                  {ticket.departureCity}
                  {","}
                  {ticket.departureCountry}
                </td>
                <td>
                  {ticket.arrivalAirport}
                  {","}
                  {ticket.arrivalCity}
                  {","}
                  {ticket.arrivalCountry}
                </td>
                <td>{ticket.departureDate}</td>
                <td>{ticket.departureTime}</td>
                <td>{ticket.noOfTraveller}</td>
                <td>{ticket?.classStatus?.class}</td>
                <td>
                  {ticket?.classStatus?.price?.currency}{" "}
                  {ticket?.classStatus?.price?.amount}
                </td>
                <td>
                  {ticket?.classStatus?.price?.currency}{" "}
                  {parseInt(ticket?.classStatus?.price?.amount, 10) *
                    parseInt(ticket?.noOfTraveller, 10)}
                </td>

                <td>
                  <Button
                    className="mx-2 bg-danger rounded"
                    onClick={() => {
                      deleteHandler(ticket.ticketId);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="mx-2 bg-info rounded"
                    onClick={() => {
                      goToDetailsPage(ticket.ticketId);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button variant="success" className="mt-5" onClick={newFlightBook}>
          Book New Flight
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confermation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do You Want to delete this ticket History?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteConfermationHandler}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default History;
