import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import "../../css/sign_up.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, email, password };

    try {
      await signupService(user);
      navigate("/login");
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err?.response?.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div id="hola">
      <div class="signupSection">
        <div class="info-signup">
          <h2>IronBeat</h2>
          <i class="icon ion-ios-ionic-outline" aria-hidden="true"></i>
          <p>Music is sharing</p>
        </div>

        <form onSubmit={handleSubmit} class="signupForm" name="signupform">
          <h2>Sign Up</h2>
          <ul class="noBullet">
            <li>
              <label htmlFor="username"></label>
              <input
                type="text"
                class="inputFields"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                class="inputFields"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                class="inputFields"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>

            <li id="center-btn">
              <input
                type="submit"
                id="join-btn"
                name="join"
                alt="Join"
                value="Join"
              />
            </li>
          </ul>
        </form>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}

export default Signup;
