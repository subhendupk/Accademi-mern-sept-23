import { useNavigate } from "react-router-dom";
import { AppData } from "../../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import jsonData from "../../flights.json";
import { Accordion, Button } from "react-bootstrap";

const BookingForm = () => {
  const { searchInfo, flightNumber, setBookingPageData, history, setPayment } =
    useContext(AppData);

  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  let searchInfoObject = searchInfo[0];
  let classFromSearchInfoObjInLowerCase = searchInfo[0]?.selectedClass
    .replace(/\s+/g, "")
    .toLowerCase();
  let flightObject = jsonData.find((element) => {
    if (element.flightNumber === flightNumber) {
      return true;
    }
  });
  // Get number of people from searchInfo
  const numberOfPerson = searchInfo[0]?.numberOfPerson;

  const [people, setPeople] = useState(
    Array(numberOfPerson).fill({ name: "", gender: "" })
  );
  const [activeKey, setActiveKey] = useState("0");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [personDetailsError, setPersonDetailsError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePersonChange = (index, field, value) => {
    let isValid = true;
    const newPeople = [...people];

    if (!people) {
      isValid = false;
      setPersonDetailsError("Enter all Details");
    }
    if (isValid) {
      newPeople[index] = { ...newPeople[index], [field]: value };
      setPeople(newPeople);
    }
  };

  const handleNextClick = (currentKey, nextKey, validationFunc) => {
    if (validationFunc()) {
      setActiveKey(nextKey);
    }
  };

  const validateFlightDetails = () => {
    return true;
    // Add any specific validation logic for flight details if needed
  };

  const validateContactDetails = () => {
    // Adding validation logic for contact details here
    let isValid = true;
    if (!email) {
      isValid = false;
      setEmailError("Email is Required");
    }
    if (!phone) {
      isValid = false;
      setPhoneError("Phone Number is Required");
    }
    if (isValid) {
      return true;
    }
  };

  const goToPaymentPage = () => {
    // Perform validation
    const allValid = people.every((person) => person.name && person.gender);

    if (allValid) {
      goTo("/payment");
    } else {
      setErrorMessage("Please Fill In all Traveller's Details!");
    }
  };
  useEffect(() => {
    setPayment(false);
  }, [setPayment]);

  useEffect(() => {
    if (flightObject && flightNumber && email && phone && people.length > 0) {
      const newObject = {
        ticketId: history.length + 101,
        ticketBookingDate: new Date(),
        flightNumber: flightNumber,
        airline: flightObject.airline,
        departureCity: flightObject?.departure?.city,
        departureAirport: flightObject?.departure?.airport,
        departureCountry: flightObject?.departure?.country,
        departureDate: flightObject?.departure?.date,
        departureTime: flightObject?.departure?.time,
        arrivalCity: flightObject?.arrival?.city,
        arrivalAirport: flightObject?.arrival?.airport,
        arrivalCountry: flightObject?.arrival?.country,
        arrivalDate: flightObject?.arrival?.date,
        arrivalTime: flightObject?.arrival?.time,
        duration: flightObject?.duration,
        noOfTraveller: numberOfPerson,
        classStatus:
          flightObject?.classStatus[classFromSearchInfoObjInLowerCase],
        contactDetails: { email: email, phoneNumber: phone },
        travellerInformation: people,
      };

      setBookingPageData([newObject]);
    }
  }, [
    people,
    email,
    phone,
    flightNumber,
    flightObject,
    history.length,
    setBookingPageData,
    classFromSearchInfoObjInLowerCase,
    numberOfPerson,
  ]);

  return (
    <div className="container bg-light rounded">
      <div className="bookingForm my-4 mx-auto">
        <h1>Booking Information</h1>

        <Accordion activeKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Review Your Flight Details</Accordion.Header>
            <Accordion.Body>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Flight Way</th>
                    <td scope="row">{searchInfoObject?.oneWayOrRoundTrip}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total Number of Person</th>
                    <td scope="row">{searchInfoObject?.numberOfPerson}</td>
                  </tr>
                  <tr>
                    <th scope="row">Class</th>
                    <td scope="row">{searchInfoObject?.selectedClass}</td>
                  </tr>
                  <tr>
                    <th scope="row">Departure Place</th>
                    <td scope="row">{searchInfoObject?.departurePlace}</td>
                  </tr>
                  <tr>
                    <th scope="row">Arrival Place</th>
                    <td scope="row">{searchInfoObject?.arrivalPlace}</td>
                  </tr>
                  <tr>
                    <th scope="row">Date</th>
                    <td scope="row">{searchInfoObject?.departureDate}</td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant="primary"
                onClick={() =>
                  handleNextClick("0", "1", validateFlightDetails)
                }
              >
                Continue
              </Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Contact Details</Accordion.Header>
            <Accordion.Body>
              <form action="">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setEmailError("");
                    }}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <span>{emailError}</span>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPhoneNumber"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setPhoneError("");
                    }}
                  />
                  <label htmlFor="floatingPhoneNumber">Phone Number</label>
                </div>
                <span>{phoneError}</span>
              </form>

              <Button
                variant="primary"
                onClick={() =>
                  handleNextClick("1", "2", validateContactDetails)
                }
              >
                Continue
              </Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Add Traveller Details</Accordion.Header>
            <Accordion.Body>
              <h3>Enter details htmlFor each passenger</h3>
              <form>
                {people.map((person, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <h4>Person {index + 1}</h4>
                      <div className="form-group">
                        <label>Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={person.name}
                          onChange={(e) => {
                            handlePersonChange(index, "name", e.target.value);
                            setErrorMessage("");
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender:</label>
                        <select
                          className="form-control"
                          value={person.gender}
                          onChange={(e) => {
                            handlePersonChange(
                              index,
                              "gender",
                              e.target.value
                            );
                            setErrorMessage("");
                          }}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <span>{personDetailsError}</span>
                  </div>
                ))}
                <div>{errorMessage}</div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    goToPaymentPage();
                  }}
                >
                  SUBMIT
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default BookingForm;
