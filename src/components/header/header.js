import { memo } from "react";
import "./header.css";

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Header = ({ state, dispatch, scrollToTop }) => {
  const themeStyle = {
    backgroundImage: state.themes.find((theme) => theme.id === state.theme).backgroundImage,
    border: state.themes.find((theme) => theme.id === state.theme).border,
  };
  const handleClickSign = () => {
    dispatch({ type: "OPEN_SIGNIN" });
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  return (
    <div className="header" style={themeStyle}>
      <div className="contacts">
        <div className="phone">
          <img loading="lazy" src={`${uri}:${port}/images/Header/mobile.jpg`} alt="phone" />
          <a href="tel:9767940053">9767940053</a>
        </div>
        <div className="email">
          <img loading="lazy" src={`${uri}:${port}/images/Header/email.jpg`} alt="email" />
          <a href="mailto:watsonacad@gmail.com">watsonacad@gmail.com</a>
        </div>
      </div>
      <div className="links">
        {state.signin.user ? (
          ""
        ) : (
          <div className="signin" style={{ backgroundColor: state.themes.find((theme) => theme.id === state.theme).backgroundColor }} onClick={() => handleClickSign()}>
            Sign In
          </div>
        )}
        <select value={state.theme} style={{ border: state.themes.find((theme) => theme.id === state.theme).border }} onChange={(e) => dispatch({ type: "CHANGE_THEME", theme: e.target.value })}>
          {state.themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
        {/* <div className='followus-text'>Follow Us</div> */}
        <div className="links-wrap">
          <a className="youtube" href="https://www.youtube.com/@watson_goa">
            <img loading="lazy" src={`${uri}:${port}/images/Header/youtube.jpg`} alt="yourube" />
          </a>
          <a className="linkedin" href="https://www.linkedin.com/in/watsonacademy">
            <img loading="lazy" src={`${uri}:${port}/images/Header/linkedin.jpg`} alt="linkedin" />
          </a>
          <a className="facebook" href="https://www.facebook.com/watsonacademygoa">
            <img loading="lazy" src={`${uri}:${port}/images/Header/facebook.jpg`} alt="facebook" />
          </a>
          <a className="instagram" href="https://www.instagram.com/watsonacademy_goa/?hl=en">
            <img loading="lazy" src={`${uri}:${port}/images/Header/instagram.jpg`} alt="instagram" />
          </a>
          {/* <a className='twitter' href='https://www.twitter.com/'>
            <img loading="lazy" src={`${uri}:${port}/images/Header/twitter.jpg`} alt='twitter' />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
