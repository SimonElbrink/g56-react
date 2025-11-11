import React, { useState } from "react";

import AlertMessage from "./AlertMessage";

import { FaCheckCircle } from "react-icons/fa";

const PersonForm = () => {
  const [email, setEmail] = useState("");

  const [showAlert, SetshowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({message:'', type:''});


  const handleEmailChange = (event) => {
    //console.log("<<<< Target Element:", event.target);
    //console.log("Target Value:", event.target.value);
    //console.log("Event Type:", event.type);

    setEmail(event.target.value);
  };

  const handleSubmit = () => {

    if (email.length < 5) {
      setAlertMessage({ message: "Email must be at least 5 characters long", type: "alert-danger" });
    }else{
        setAlertMessage({ message: `Email is valid: ${email}`, type: "alert-success" });
        setEmail("");

    }
    SetshowAlert(true);
  };

  const handleResetForm = () => {
    setEmail("");

    SetshowAlert(false);
  };

  return (
    <>
      <div className="container mt-3">
        {showAlert && (
          <AlertMessage
            icon={<FaCheckCircle />}
            alertType={alertMessage.type}
            message={alertMessage.message}
          />
        )}

        <form>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Register
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleResetForm}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default PersonForm;
