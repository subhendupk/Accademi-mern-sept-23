import React from "react";
import { useNavigate } from "react-router-dom";
import LogInComponent from "../../components/LogInComponent";
import { Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goToSearchFlights = () => {
    goTo("/search-flights");
  };
  return (
    <div>
      <div className="container-fluid">
        <LogInComponent />
        <div className=" my-5 btnBox  d-grid ">
          <Button
            className="bg-secondary col"
            size="lg"
            onClick={goToSearchFlights}
          >
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
