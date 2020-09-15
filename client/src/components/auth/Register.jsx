import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setLocation } from "../../actions/location";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Loader from "../layout/Loader";

const Register = ({
  isAuthenticated,
  setAlert,
  setLocation,
  register,
  location,
}) => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    city: "",
    state: "",
    country: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    setLocation();
  };

  useEffect(() => {
    const { city, state, country } = location;
    setFormData((formData) => ({ ...formData, city, state, country }));
  }, [location]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setAlert("Re-entered password does not match password", "invalid");
    } else {
      const location = { city, state, country };
      register({ name, email, password, location });
    }
  };

  let {
    name,
    email,
    password,
    passwordConfirmation,
    city,
    state,
    country,
  } = formData;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-form">
      <h1>Register for An Account</h1>
      <form
        method="post"
        action="/api/users"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <label htmlFor="name" className="space-top-md">
          <h4>
            Name <span className="requiredField">*</span>:
          </h4>
          <input
            type="text"
            name="name"
            onChange={(e) => handleOnChange(e)}
            value={name}
            className="space-top-sm"
          />
        </label>
        <label htmlFor="email" className="space-top-md">
          <h4>
            Email <span className="requiredField">*</span>:
          </h4>
          <input
            type="email"
            name="email"
            onChange={(e) => handleOnChange(e)}
            value={email}
            className="space-top-sm"
          />
        </label>
        <label htmlFor="password" className="space-top-md">
          <h4>
            Password <span className="requiredField">*</span>:
          </h4>
          <input
            type="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
            value={password}
            className="space-top-sm"
          />
        </label>

        <label
          htmlFor="passwordConfirmation"
          className="input-field space-top-md"
        >
          <h4>
            Re-enter Password <span className="requiredField">*</span>:
          </h4>
          <input
            type="password"
            name="passwordConfirmation"
            onChange={(e) => handleOnChange(e)}
            value={passwordConfirmation}
            className="space-top-sm"
          />
        </label>

        <hr className="space-top-md" />
        <h2 className="space-top-bg">Location</h2>
        <p className="additionalInfo space-top-sm">
          We collect your locational information find service providers near you
        </p>
        <div className="use-location">
          <button
            type="button"
            className="space-top-md btn-bg"
            onClick={handleGetLocation}
          >
            Use Location on IP Address
          </button>
          <Loader />
        </div>
        <label htmlFor="city" className="space-top-md">
          <h4>City:</h4>
          <input
            type="text"
            name="city"
            onChange={(e) => handleOnChange(e)}
            value={city}
            className="space-top-sm"
          />
        </label>

        <label htmlFor="state" className="space-top-md">
          <h4>State:</h4>
          <input
            type="text"
            name="state"
            onChange={(e) => handleOnChange(e)}
            value={state}
            className="space-top-sm"
          />
        </label>

        <label htmlFor="country" className="space-top-md">
          <h4>Country:</h4>
          <input
            type="text"
            name="country"
            onChange={(e) => handleOnChange(e)}
            value={country}
            className="space-top-sm"
          />
        </label>

        <input type="submit" value="Register" className="space-top-bg" />
        <p className="space-top-md">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

let mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  location: state.location,
});

export default connect(mapStateToProps, { setAlert, setLocation, register })(
  Register
);
