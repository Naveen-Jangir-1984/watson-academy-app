import { useState, memo, useCallback } from "react";
import "./poster.css";

import { getBaseUrl } from "../../config/api";

const Poster = ({ state, dispatch, scrollToPosters }) => {
  const images = state.posters.images;
  const imageWithIndexes = images.map((image, index) => {
    return {
      index: index,
      logo: image.logo,
      isSelected: image.isSelected,
    };
  });
  const selectedImage = imageWithIndexes.find((image) => image.isSelected);
  const [index, setIndex] = useState(selectedImage ? selectedImage.index : 0);
  const baseUrl = getBaseUrl();

  const closePoster = useCallback(() => {
    dispatch({ type: "CLOSE_POSTER" });
    setIndex(null);
    setTimeout(() => {
      scrollToPosters.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [dispatch, scrollToPosters]);

  return (
    <div className="poster">
      <div className="poster-bgd"></div>
      <div className="poster-content">
        <img loading="lazy" className="close" src={`${baseUrl}/images/close.png`} alt="close" onClick={closePoster} />
        <img loading="lazy" className="left" style={{ display: index === 0 ? "none" : "block" }} src={`${baseUrl}/images/Posters/left.jpg`} alt="left" onClick={() => setIndex(index - 1)} />
        <img loading="lazy" className="poster-image" src={images[index].logo} alt="poster" />
        <img loading="lazy" className="right" style={{ display: index === images.length - 1 ? "none" : "block" }} src={`${baseUrl}/images/Posters/right.jpg`} alt="right" onClick={() => setIndex(index + 1)} />
      </div>
    </div>
  );
};

export default memo(Poster);
