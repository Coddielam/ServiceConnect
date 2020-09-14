import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { email, password } = formData;

  return (
    <div className="auth-form">
      <h1>Login to Your Account</h1>
      <form
        method="post"
        action="/api/auth"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <label htmlFor="email" className="space-top-md">
          <h4>Email:</h4>
          <input
            type="email"
            name="email"
            onChange={(e) => handleOnChange(e)}
            value={email}
            className="space-top-sm"
          />
        </label>
        <label htmlFor="password" className="space-top-md">
          <h4>Password:</h4>
          <input
            type="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
            value={password}
            className="space-top-sm"
          />
        </label>

        <input type="submit" value="Login" className="space-top-bg" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
