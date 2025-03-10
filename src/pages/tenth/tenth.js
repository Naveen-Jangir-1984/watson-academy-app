import './tenth.css';
import ContainerRight from '../../components/container-right/container-right';

const Tenth = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <div className='title'>Time Table for Class 8<sup>th</sup>, 9<sup>th</sup> and 10<sup>th</sup></div>
        <div className='tenth'>
          <div className='col'>
            <div className='row'>Class</div>
            <div className='row'>8th</div>
            <div className='row'>8th</div>
            <div className='row'>9th</div>
            <div className='row'>9th</div>
            <div className='row'>10th</div>
            <div className='row'>10th</div>
          </div>
          <div className='col'>
            <div className='row'>Time</div>
            <div className='row'>5:00-6:00 PM</div>
            <div className='row'>6:00-7:00 PM</div>
            <div className='row'>5:00-6:00 PM</div>
            <div className='row'>6:00-7:00 PM</div>
            <div className='row'>5:00-6:00 PM</div>
            <div className='row'>6:00-7:00 PM</div>
          </div>
          <div className='col'>
            <div className='row'>Monday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Biology</div>
            <div className='row'>Biology</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Tuesday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Biology</div>
            <div className='row'>Biology</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Wednesday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Chemistry</div>
            <div className='row'>Chemistry</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Thursday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Chemistry</div>
            <div className='row'>Chemistry</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Friday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Physics</div>
            <div className='row'>Physics</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Saturday</div>
            <div className='row'>Maths</div>
            <div className='row'>Science</div>
            <div className='row'>Maths</div>
            <div className='row'>Physics</div>
            <div className='row'>Physics</div>
            <div className='row'>Maths</div>
          </div>
          <div className='col'>
            <div className='row'>Sunday</div>
            <div className='row'>Class + Test</div>
            <div className='row'>Class + Test</div>
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

export default Tenth;