import './tenth.css';
import ContainerRight from '../../components/container-right/container-right';

const Tenth = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Time Table for Class 8<sup>th</sup>, 9<sup>th</sup> and 10<sup>th</sup></h2>
        <div className='tenth'>
          <div className='row'>
            <div className='col'>Class</div>
            <div className='col'>Time</div>
            <div className='col'>Mon</div>
            <div className='col'>Tue</div>
            <div className='col'>Wed</div>
            <div className='col'>Thu</div>
            <div className='col'>Fri</div>
            <div className='col'>Sat</div>
            <div className='col'>Sun</div>
          </div>
          <div className='row'>
            <div className='col'>8th</div>
            <div className='col'>5:00 - 6:00 PM</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Class/Test</div>
          </div>
          <div className='row'>
            <div className='col'>8th</div>
            <div className='col'>6:00 - 7:00 PM</div>
            <div className='col'>Science</div>
            <div className='col'>Science</div>
            <div className='col'>Science</div>
            <div className='col'>Science</div>
            <div className='col'>Science</div>
            <div className='col'>Science</div>
            <div className='col'>Class/Test</div>
          </div>
          <div className='row'>
            <div className='col'>9th</div>
            <div className='col'>5:00 - 6:00 PM</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Class/Test</div>
          </div>
          <div className='row'>
            <div className='col'>9th</div>
            <div className='col'>6:00 - 7:00 PM</div>
            <div className='col'>Biology</div>
            <div className='col'>Biology</div>
            <div className='col'>Chemistry</div>
            <div className='col'>Chemistry</div>
            <div className='col'>Physics</div>
            <div className='col'>Physics</div>
            <div className='col'>Class/Test</div>
          </div>
          <div className='row'>
            <div className='col'>10th</div>
            <div className='col'>5:00 - 6:00 PM</div>
            <div className='col'>Biology</div>
            <div className='col'>Biology</div>
            <div className='col'>Chemistry</div>
            <div className='col'>Chemistry</div>
            <div className='col'>Physics</div>
            <div className='col'>Physics</div>
            <div className='col'>Class/Test</div>
          </div>
          <div className='row'>
            <div className='col'>10th</div>
            <div className='col'>6:00 - 7:00 PM</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Maths</div>
            <div className='col'>Class/Test</div>
          </div>
        </div>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Tenth;