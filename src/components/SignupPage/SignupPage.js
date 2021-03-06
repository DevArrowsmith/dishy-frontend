import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signUp, signIn } from "../../controllers/loginControllers";
import { UserContext } from "../../contexts/UserContext";
import Message from "../common/Message";
import SignupHeaderImage from "../../assets/signup-image-1.png";
import "../../styles/SignupPage.css";

function SignUpPage() {
  const initialState = {
    fields: { username: "", password: "" },
    newUser: false,
  };
  const [fields, setFields] = useState(initialState.fields);
  const [newUser, setNewUser] = useState(initialState.newUser);
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signUp(fields)
      .then(() => {
        setNewUser(true);
      })
      .catch((error) => console.log(error));
    await signIn(fields).then((res) => {
      if (res.data.accessToken) {
        const loggedInUser = {
          username: res.data.username,
          accessToken: res.data.accessToken,
          id: res.data.id,
        };
        setUser(loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        setTimeout(() => {
          setNewUser(false);
          history.push("/");
        }, 3000);
      }
    });
  };

  return (
    <div className="SignupPage">
      {newUser ? (
        <Message
          messageType="banner banner-flash banner-spaced"
          messageText="New account created! Signing in..."
        />
      ) : (
        <>
          <h2 className="SignupPage-header" id="SignupPage-header">
            <img src={SignupHeaderImage} alt="Sign Up" />
          </h2>

          <form className="SignupPage-form" onChange={handleFieldChange}>
            <label className="SignupPage-form-field" htmlFor="username">
              <p>username:</p>
              <input type="text" name="username" />
            </label>

            <label className="SignupPage-form-field" htmlFor="email">
              <p>email:</p>
              <input type="text" name="email" />
            </label>

            <label className="SignupPage-form-field" htmlFor="password">
              <p>password:</p>
              <input type="password" name="password" />
            </label>

            <button
              className="SignupPage-signup-button"
              type="submit"
              onClick={handleFormSubmit}
            >
              Create Account
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default SignUpPage;
