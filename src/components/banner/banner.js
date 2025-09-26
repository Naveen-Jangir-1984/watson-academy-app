import { memo } from "react";
import "./banner.css";

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Banner = ({ state, dispatch }) => {
  return (
    <div className={`banner-${state.banner.position}`}>
      <img className="banner-close" loading="lazy" src={`${uri}:${port}/images/close.png`} alt="close" onClick={() => dispatch({ type: "CLOSE_BANNER" })} />
      <div className="banner-message">{state.banner.message}</div>
    </div>
  );
};

export default memo(Banner);
