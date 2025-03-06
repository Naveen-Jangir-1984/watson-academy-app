import CLOSE from '../../images/close.png'
import './poster.css'

const Poster = ({ state, dispatch }) => {
  return (
    <div className='poster'>
      <div className='poster-bgd'></div>
      <div className='poster-content'>
        <img className='close' src={CLOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_POSTER'})} />
        <img className='poster-image' src={state.displayPoster.images.find(image => image.isSelected).name} alt='poster' />
      </div>
    </div>
  );
}

export default Poster;