import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppData } from "../../contexts/AppContext";
import jsonData from "../../flights.json";
import { useNavigate } from "react-router-dom";

function Payment() {
  const {
    searchInfo,
    flightNumber,
    payment,
    setPayment,
    bookingPageData,
    setBookingPageData,
    history,
    setHistory,
  } = useContext(AppData);

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  const [show, setShow] = useState(false);

  // Get number of people from searchInfo
  const numberOfPerson = searchInfo[0].numberOfPerson;

  let classFromSearchInfoObjInLowerCase = searchInfo[0]?.selectedClass
    .replace(/\s+/g, "")
    .toLowerCase();

  let flightObject = jsonData.find((element) => {
    if (element.flightNumber === flightNumber) {
      return true;
    }
  });

  const priceAsPerClass =
    flightObject.classStatus[classFromSearchInfoObjInLowerCase].price.amount;

  const paymentHandler = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setPayment(false);
  };

  const paymentConfermationHandler = () => {
    setShow(false);
    setPayment(true);

    // Update booking page data with payment status
    setBookingPageData((currentArray) => {
      const updatedArray = [...currentArray];
      updatedArray[0].paymentStatus = "Successful";
      return updatedArray;
    });

    // Check if the ticket already exists in the history
    const ticketId = bookingPageData[0].ticketId;
    const isExistingTicket = history.some(
      (object) => object.ticketId === ticketId
    );

    if (!isExistingTicket) {
      // Update history
      setHistory((currentHistoryArray) => {
        return [...currentHistoryArray, ...bookingPageData];
      });
    } else {
      // Optionally update the existing entry if needed
      setHistory((currentHistoryArray) =>
        currentHistoryArray.map((entry) =>
          entry.ticketId === ticketId
            ? { ...entry, ...bookingPageData[0] }
            : entry
        )
      );
    }

    goTo("/history");
  };

  useEffect(() => {
    setPayment(false);
    setBookingPageData((currentArray) => {
      const updatedArray = [...currentArray];
      if (payment === true) {
        updatedArray[0].paymentStatus = "Successful";
      } else {
        updatedArray[0].paymentStatus = "Unsuccessful";
      }
      return updatedArray;
    });
  }, [setPayment]);

  const backToBooking = () => {
    goTo("/booking");
  };

  return (
    <div className="container">
      <div className="text-center my-5">
        <h3>
          You Have to Pay{" "}
          {parseInt(numberOfPerson, 10) * parseInt(priceAsPerClass, 10)}
        </h3>
        <Button
          className="mt-3 bg-secondary mx-2"
          variant="primary"
          onClick={() => {
            backToBooking();
          }}
        >
          Back
        </Button>
        <Button
          className="mt-3 mx-2"
          variant="primary"
          onClick={() => {
            paymentHandler();
          }}
        >
          Complete Payment
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment Confermation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do You Want to make this Payment?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={paymentConfermationHandler}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Payment;
