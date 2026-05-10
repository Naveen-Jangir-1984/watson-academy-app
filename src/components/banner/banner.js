import { memo } from "react";
import "./banner.css";

import { getBaseUrl } from "../../config/api";

const Banner = ({ state, dispatch }) => {
  const baseUrl = getBaseUrl();
  return (
    <div className={`banner-${state.banner.position}`}>
      <img className="banner-close" loading="lazy" src={`${baseUrl}/images/close.png`} alt="close" onClick={() => dispatch({ type: "CLOSE_BANNER" })} />
      <div className="banner-message">{state.banner.message}</div>
    </div>
  );
};

export default memo(Banner);
