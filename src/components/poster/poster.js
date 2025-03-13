import { useState } from 'react';
import CLOSE from '../../images/close.png';
import LEFT from '../../images/Posters/left.jpg';
import RIGHT from '../../images/Posters/right.jpg';
import './poster.css'

const Poster = ({ state, dispatch, scrollToPosters }) => {
  const images = state.posters.images;
  const seletedImage = images.find(image => image.isSelected);
  const [id, setId] = useState(seletedImage.id - 1);
  return (
    <div className='poster'>
      <div className='poster-bgd'></div>
      <div className='poster-content'>
        <img className='close' src={CLOSE} alt='close' onClick={() => {
          dispatch({type: 'CLOSE_POSTER'});
          setTimeout(() => {
            scrollToPosters.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
          }}
        />
        <img className='left' style={{display: id === 1 ? 'none' : 'block'}} src={LEFT} alt='left' onClick={() => setId(id - 1)} />
        <img className='poster-image' src={images[id].logo} alt='poster' />
        <img className='right' style={{display: id === images.length - 1 ? 'none' : 'block'}} src={RIGHT} alt='right' onClick={() => setId(id + 1)} />
      </div>
    </div>
  );
}

export default Poster;