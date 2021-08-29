import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  const validateReservation = () => {
    const errorsArr = [];
    const today = new Date();
    const resDate = new Date(formFields.reservation_date);
    const resTime = formFields.reservation_time;
    console.log(resTime);

    if (resDate < today) {
      errorsArr.push({ message: "Please pick a future date" });
    }

    if (resDate.getDay() === 2) {
      errorsArr.push({ message: "The restaraunt is closed on Tuesdays!" });
    }

    if (resTime < "10:30" || resTime > "17:30") {
      errorsArr.push({
        message:
          "Please select a reservation time between 10:30 AM and 9:30 PM",
      });
    }

    setErrors(errorsArr);
    if (errorsArr.length > 0) {
      return false;
    }
    return true;
  };

  const errorList = () => {
    return errors.map((err, index) => <ErrorAlert key={index} error={err} />);
  };

  const handleSubmit = async (e) => {
    console.log("ya submitted");
    e.preventDefault();
    if (validateReservation()) {
      createReservation(formFields)
        .then((output) =>
          history.push(`/dashboard?date=${formFields.reservation_date}`)
        )
        .catch(errors);
    }
  };

  function handleCancel() {
    history.push("/dashboard");
  }

  return (
    <div className="bootstrap-iso">
      <div className="container-fluid">
        <h2 className="pt-5 libreFont">New Reservation</h2>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <form onSubmit={handleSubmit} method="post">
              {errorList()}
              <div className="form-group">
                <label className="control-label requiredField" htmlFor="name">
                  First Name
                  <span className="asteriskField">*</span>
                </label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) =>
                    setFormFields({ ...formFields, first_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group ">
                <label className="control-label requiredField" htmlFor="name1">
                  Last Name
                  <span className="asteriskField">*</span>
                </label>
                <input
                  className="form-control"
                  id="name1"
                  name="name1"
                  type="text"
                  onChange={(e) =>
                    setFormFields({ ...formFields, last_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group ">
                <label className="control-label requiredField" htmlFor="tel">
                  Telephone #<span className="asteriskField">*</span>
                </label>
                <input
                  className="form-control"
                  id="tel"
                  name="tel"
                  placeholder="000-000-0000"
                  type="text"
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      mobile_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group ">
                <label className="control-label requiredField" htmlFor="date">
                  Date
                  <span className="asteriskField">*</span>
                </label>
                <input
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="MM-DD-YYYY"
                  type="text"
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      reservation_date: e.target.value,
                    })
                  }
                />
                <i className="fas fa-calendar input-prefix"></i>
              </div>
              <div className="form-group">
                <label
                  className="control-label requiredField"
                  htmlFor="inputMDEx1"
                >
                  Time
                  <span className="asteriskField">*</span>
                </label>
                <input
                  type="time"
                  id="inputMDEx1"
                  className="form-control"
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      reservation_time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group ">
                <label className="control-label requiredField" htmlFor="number">
                  Group Size
                  <span className="asteriskField">*</span>
                </label>
                <input
                  className="form-control"
                  id="number"
                  name="number"
                  type="number"
                  onChange={(e) =>
                    setFormFields({ ...formFields, people: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <div>
                  <button
                    className="btn btn-primary mr-4"
                    name="submit"
                    type="submit"
                  >
                    <span className="oi oi-check mr-2"></span>
                    Submit
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-danger"
                    type="button"
                  >
                    <span className="oi oi-circle-x mr-2"></span>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
