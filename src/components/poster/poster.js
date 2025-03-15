import { useState } from 'react';
import './poster.css'

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Poster = ({ state, dispatch, scrollToPosters }) => {
  const images = state.posters.images;
  const seletedImage = images.find(image => image.isSelected);
  const [id, setId] = useState(seletedImage.id - 1);
  return (
    <div className='poster'>
      <div className='poster-bgd'></div>
      <div className='poster-content'>
        <img className='close' src={`${uri}:${port}/images/close.png`} alt='close' onClick={() => {
          dispatch({type: 'CLOSE_POSTER'});
          setTimeout(() => {
            scrollToPosters.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
          }}
        />
        <img className='left' style={{display: id === 1 ? 'none' : 'block'}} src={`${uri}:${port}/images/Posters/left.jpg`} alt='left' onClick={() => setId(id - 1)} />
        <img className='poster-image' src={images[id].logo} alt='poster' />
        <img className='right' style={{display: id === images.length - 1 ? 'none' : 'block'}} src={`${uri}:${port}/images/Posters/right.jpg`} alt='right' onClick={() => setId(id + 1)} />
      </div>
    </div>
  );
}

export default Poster;