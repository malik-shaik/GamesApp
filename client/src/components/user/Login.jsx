import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAction } from "../../context/actions";
import { resetErrorAction } from "../../context/actions";
import "./styles/users.css";

const Login = () => {
  const { user, dispatch } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: "/profile" };

  if (user.isAuthenticated) history.push(from);

  const onSubmit = (data) => loginAction(data, dispatch);

  const displayError = (errmsg) => {
    setTimeout(() => {
      resetErrorAction(dispatch);
    }, 2500);
    return errmsg;
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="info-container">
          {user.error !== null && (
            <div className="error-info error-info-animation">
              <i className="fas fa-exclamation-triangle"></i>
              <span> {displayError(user.error)}</span>
            </div>
          )}
        </div>
        <div className="form-container">
          <form
            className="login-form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  },
                })}
              />
              {errors.email && (
                <small className="err-msg">* Invalid email address</small>
              )}
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/,
                  },
                })}
              />
              {errors.password && (
                <small className="err-msg">
                  * Minimum 5 alpha numberic charecters
                </small>
              )}
            </div>

            <div className="input-group btn-login">
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>
          <div className="login-link">
            <small>Are a new member ? </small>{" "}
            <Link to="/signup">Register</Link> <small> here</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
