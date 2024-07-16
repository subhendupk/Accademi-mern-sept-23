import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

function SignUpComponent() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goTo = (path) => {
    navigate(path);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");



  const signupHandler = async () => {
    let isValid = true;

    if (!name) {
      isValid = false;
      setNameErrorMessage("Name is Required !");
    }
    if (!email) {
      isValid = false;
      setEmailErrorMessage("Email is Required !");
    }
    if (!phone) {
      isValid = false;
      setPhoneErrorMessage("Phone Number is Required !");
    }
    if (!password) {
      isValid = false;
      setPasswordErrorMessage("Please Set a Password !");
    }
    if (isValid) {
      let newUser = {};
      newUser.name = name;
      newUser.email = email;
      newUser.phone = phone;
      newUser.password = password;
      try {
        await dispatch(register(newUser)).unwrap();
        goTo("/auth/login");
        clearSignUpForm();
      } catch (error) {
        console.log(error);
      }

    }
  };

  const clearSignUpForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Sign Up</h1>
        <div className="signUpBox border rounded p-3">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameErrorMessage("");
                  setMessage("");
                }}
              />
              <span>{nameErrorMessage}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailErrorMessage("");
                  setMessage("");
                }}
              />
              <span>{emailErrorMessage}</span>

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phonenumber"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setPhoneErrorMessage("");
                  setMessage("");
                }}
              />
              <span>{phoneErrorMessage}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordErrorMessage("");
                  setMessage("");
                }}
              />
              <span>{passwordErrorMessage}</span>
            </div>
            <div className="text-center mt-5 mb-3">
              <button
                type="button"
                className="btn btn-primary  "
                onClick={signupHandler}
              >
                Sign Up
              </button>
            </div>
          </form>
          <span>{message}</span>
          <div className="ifHaveAnAccount text-center">
            <p>
              Already Have An Account? <Link to="/auth/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
