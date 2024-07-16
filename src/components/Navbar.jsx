import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppData } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { setMatchedFlightsData } =
    useContext(AppData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goTo = (path) => {
    navigate(path);
  };
  const goToSignUpPage = () => {
    goTo("/auth/signup");
  };
  const goToLogInPage = () => {
    goTo("/auth/login");
  };

  const historyHanlder = () => {
    // if (isLoggedIn === true) {
    goTo("/history");
    // } else {
    //   goTo("/auth/login");
    // }
  };
  const handleLogout = () => {
    setMatchedFlightsData((matchedDataArray, index) => {
      matchedDataArray.splice(0);
      return matchedDataArray;
    });
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg colorClass">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FlightToFly
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/search-flights"
                >
                  Flights
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/history"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
          {isLoggedIn ? (
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={goToLogInPage}
              >
                Log In
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={goToSignUpPage}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
