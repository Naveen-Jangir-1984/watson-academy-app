import './twelfth.css';
import ContainerRight from '../../components/container-right/container-right';

const Twelfth = ({ state, dispatch }) => {
  return (
    <div className='container'>
    <div className='container-left'>
      <div className='title'>Time Table for Class 11<sup>th</sup> and 12<sup>th</sup></div>
      <div className='twelfth'>
        <div className='col'>
          <div className='row'>Class</div>
          <div className='row'>11th</div>
          <div className='row'>11th</div>
          <div className='row'>12th</div>
          <div className='row'>12th</div>
        </div>
        <div className='col'>
          <div className='row'>Time</div>
          <div className='row'>6:00-7:30 AM</div>
          <div className='row'>5:00-7:00 PM</div>
          <div className='row'>6:00-7:30 AM</div>
          <div className='row'>5:00-7:00 PM</div>
        </div>
        <div className='col'>
          <div className='row'>Monday</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
        </div>
        <div className='col'>
          <div className='row'>Tuesday</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
        </div>
        <div className='col'>
          <div className='row'>Wednesday</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
        </div>
        <div className='col'>
          <div className='row'>Thursday</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
        </div>
        <div className='col'>
          <div className='row'>Friday</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
        </div>
        <div className='col'>
          <div className='row'>Saturday</div>
          <div className='row'>Chemistry</div>
          <div className='row'>Biology</div>
          <div className='row'>Physics</div>
          <div className='row'>Maths</div>
        </div>
        <div className='col'>
          <div className='row'>Sunday</div>
          <div className='row'>Class + Test</div>
          <div className='row'>Class + Test</div>
          <div className='row'>Class + Test</div>
          <div className='row'>Class + Test</div>
        </div>
      </div>
    </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Twelfth;