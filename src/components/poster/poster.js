import CLOSE from '../../images/close.png'
import './poster.css'

const Poster = ({ state, dispatch }) => {
  return (
    <div className='poster'>
      <div className='poster-bgd'></div>
      <div className='poster-content'>
        <img className='close' src={CLOSE} alt='close' onClick={() => {
          dispatch({type: 'CLOSE_POSTER'});
          setTimeout(() => {
            state.scrollToPosters.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
          }}
        />
        <img className='poster-image' src={state.displayPoster.images.find(image => image.isSelected).logo} alt='poster' />
      </div>
    </div>
  );
}

export default Poster;