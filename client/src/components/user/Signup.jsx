import React, { useContext, useRef } from "react";
// import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import { signupAction } from "../../context/actions";
import { resetErrorAction } from "../../context/actions";

const Signup = () => {
  const { user, dispatch } = useContext(UserContext);
  const { register, handleSubmit, getValues, errors } = useForm();
  const emailRef = useRef(null);

  if (user.isAuthenticated) return <Redirect to="/profile" />;
  const onSubmit = (data) => signupAction(data, dispatch);
  const displayError = (errmsg) => {
    setTimeout(() => {
      resetErrorAction(dispatch);
    }, 3000);
    // const emailNode = ReactDOM.findDOMNode(emailRef.current);
    // const emailInput = emailNode.querySelector("input");
    // emailInput.focus();
    return errmsg;
  };

  return (
    <section className="main-container">
      <div className="signup-container">
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
            className="join-form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                autoComplete="false"
                name="name"
                ref={register({
                  required: "* Name must be minimum 2 charecters",
                  minLength: 3,
                  pattern: { value: /^[a-zA-Z\s]+$/ },
                })}
              />
              {errors.name && (
                <small className="err-msg">{errors.name.message}</small>
              )}
            </div>

            <div ref={emailRef} className="input-group">
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
              {user.error && (
                <small className="err-msg">* Use different email address</small>
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

            <div className="input-group">
              <label> Confirm Password:</label>
              <input
                name="cpassword"
                type="password"
                ref={register({
                  required: true,
                  validate: (value) => value === getValues().password,
                })}
              />
              {errors.cpassword && (
                <small className="err-msg">* Password doesn't match</small>
              )}
            </div>

            <div className="input-group btn-signup">
              <button type="submit" className="signup-btn">
                Signup
              </button>
            </div>
          </form>
          <div className="login-link">
            <small>Already a member ? </small>
            <Link to="/login">Login</Link>
            <small> here</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
