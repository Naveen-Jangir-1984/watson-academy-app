import CryptoJS from "crypto-js";
import { useState, memo } from "react";
import "./signin.css";

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
const secretKey = process.env.REACT_APP_SECRET_KEY;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const SignIn = ({ state, dispatch, scrollToTop }) => {
  const themeStyle = {
    backgroundImage: state.theme === "cool" ? "linear-gradient(to right bottom, lightblue, lightyellow)" : state.theme === "light" ? "linear-gradient(to right bottom, whitesmoke, whitesmoke)" : "none",
    border: state.theme === "cool" ? "1px solid lightskyblue" : state.theme === "light" ? "1px solid lightgrey" : "none",
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
    const response = await fetch(`${uri}:${port}/${resource}/attempts`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: encryptData(username), password: encryptData(password) }),
    });
    const data = await response.text();
    if (decryptData(data).result === "success") {
      const updatedAttempts = decryptData(data).attempts;
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
        <img loading="lazy" className="login-close" src={`${uri}:${port}/images/close.png`} alt="close" onClick={() => handleCloseSignIn()} />
        <div className="username">
          <input name="username" type="text" value={username} placeholder="mobile / email" onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className="password">
          <input name="password" type="password" value={password} placeholder="password" onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className="actions">
          <button type="button" style={{ pointerEvents: disableButtonClear ? "none" : "all" }} disabled={disableButtonClear} onClick={() => handleClearSignIn()}>
            Clear
          </button>
          <button type="button" style={{ pointerEvents: disableButtonSubmit ? "none" : "all" }} disabled={disableButtonSubmit} onClick={() => handleSubmitSignIn()}>
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
