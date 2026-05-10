import { useState, memo } from "react";
import "./signin.css";

import { encryptData, decryptData } from "../../utils/crypto";
import { getApiUrl, getBaseUrl } from "../../config/api";
import useTheme from "../../hooks/useTheme";

const SignIn = ({ state, dispatch, scrollToTop }) => {
  const themeData = useTheme(state);
  const themeStyle = {
    backgroundImage: themeData.backgroundImage,
    border: themeData.border,
  };
  const { username, password, error } = state.signin.inputs;
  const user = state.users.find((user) => user.mobile === username || user.email === username);
  const attemptsLeft = user?.attempts > 0 ? 3 - user?.attempts : 0;
  const [attempts, setAttempts] = useState(attemptsLeft);
  const handleCloseSignIn = () => {
    handleClearSignIn();
    dispatch({ type: "CLOSE_SIGNIN" });
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  const handleSignInInputs = (e) => {
    const element = e.target;
    dispatch({ type: "INPUT_SIGNIN", attribute: element.name, value: element.value });
  };
  const handleClearSignIn = () => {
    dispatch({ type: "INPUT_SIGNIN", attribute: "username", value: "" });
    dispatch({ type: "INPUT_SIGNIN", attribute: "password", value: "" });
    dispatch({ type: "INPUT_SIGNIN", attribute: "error", value: "" });
    setAttempts(0);
  };
  const handleSubmitSignIn = async () => {
    const response = await fetch(getApiUrl("attempts"), {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: encryptData(username), password: encryptData(password) }),
    });
    const data = await response.text();
    const result = decryptData(data);
    if (result.result === "success") {
      const updatedAttempts = result.attempts;
      setAttempts(updatedAttempts > 0 ? 3 - updatedAttempts : -1);
      dispatch({ type: "SIGNIN", username: username, password: password, attempts: updatedAttempts });
      setTimeout(() => {
        scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };
  const disableButtonClear = username === "" && password === "";
  const disableButtonSubmit = username === "" || password === "";
  return (
    <div className="login">
      <div className="login-bgd"></div>
      <div className="panel" style={themeStyle}>
        <div>Sign In</div>
        <img loading="lazy" className="login-close" src={`${getBaseUrl()}/images/close.png`} alt="close" onClick={() => handleCloseSignIn()} />
        <div className="username">
          <input name="username" type="text" value={username} placeholder="mobile / email" onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className="password">
          <input name="password" type="password" value={password} placeholder="password" onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className="actions">
          <button type="button" style={{ pointerEvents: disableButtonClear ? "none" : "all", backgroundColor: "#fcc" }} disabled={disableButtonClear} onClick={() => handleClearSignIn()}>
            Clear
          </button>
          <button type="button" style={{ pointerEvents: disableButtonSubmit ? "none" : "all", backgroundColor: "#cfc" }} disabled={disableButtonSubmit} onClick={() => handleSubmitSignIn()}>
            Submit
          </button>
        </div>
        {error ? <div className="error">{error}</div> : ""}
        {user && attempts > 0 ? <div className="error" style={{ color: "blue" }}>{`You have ${attempts} more ${attempts > 1 ? "attempts" : "attempt"} left !`}</div> : ""}
      </div>
    </div>
  );
};

export default memo(SignIn);
