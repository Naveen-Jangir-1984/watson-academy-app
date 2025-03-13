import './twelfth.css';
import ContainerRight from '../../components/container-right/container-right';

const Twelfth = ({ state, dispatch, scrollToTop, scrollToPosters }) => {
  return (
    <div className='container'>
    <div className='container-left'>
      <div className='title'>Time Table for Class 11<sup>th</sup> and 12<sup>th</sup></div>
        <div className='twelfth'>
          <div className='col'>
            <div className='row'>
              <div className='cell'>Class 11th</div>
              <div className='cell'>Time 6:00 - 7:30 AM</div>
            </div>
            <div className='row'>
              <div className='cell'>Mon</div>
              <div className='cell'>Tue</div>
              <div className='cell'>Wed</div>
              <div className='cell'>Thu</div>
              <div className='cell'>Fri</div>
              <div className='cell'>Sat</div>
              <div className='cell'>Sun</div>
            </div>
            <div className='row'>
              <div className='cell'>PHY</div>
              <div className='cell'>CHE</div>
              <div className='cell'>PHY</div>
              <div className='cell'>CHE</div>
              <div className='cell'>PHY</div>
              <div className='cell'>CHE</div>
              <div className='cell'>C + T</div>
            </div>
          </div>
          <div className='col'>
            <div className='row'>
              <div className='cell'>Class 11th</div>
              <div className='cell'>Time 5:00 - 7:00 PM</div>
            </div>
            <div className='row'>
              <div className='cell'>Mon</div>
              <div className='cell'>Tue</div>
              <div className='cell'>Wed</div>
              <div className='cell'>Thu</div>
              <div className='cell'>Fri</div>
              <div className='cell'>Sat</div>
              <div className='cell'>Sun</div>
            </div>
            <div className='row'>
              <div className='cell'>MAT</div>
              <div className='cell'>BIO</div>
              <div className='cell'>MAT</div>
              <div className='cell'>BIO</div>
              <div className='cell'>MAT</div>
              <div className='cell'>BIO</div>
              <div className='cell'>C + T</div>
            </div>
          </div>
          <div className='col'>
            <div className='row'>
              <div className='cell'>Class 12th</div>
              <div className='cell'>Time 6:00 - 7:30 AM</div>
            </div>
            <div className='row'>
              <div className='cell'>Mon</div>
              <div className='cell'>Tue</div>
              <div className='cell'>Wed</div>
              <div className='cell'>Thu</div>
              <div className='cell'>Fri</div>
              <div className='cell'>Sat</div>
              <div className='cell'>Sun</div>
            </div>
            <div className='row'>
              <div className='cell'>CHE</div>
              <div className='cell'>PHY</div>
              <div className='cell'>CHE</div>
              <div className='cell'>PHY</div>
              <div className='cell'>CHE</div>
              <div className='cell'>PHY</div>
              <div className='cell'>C + T</div>
            </div>
          </div>
          <div className='col'>
            <div className='row'>
              <div className='cell'>Class 12th</div>
              <div className='cell'>Time 5:00 - 7:00 PM</div>
            </div>
            <div className='row'>
              <div className='cell'>Mon</div>
              <div className='cell'>Tue</div>
              <div className='cell'>Wed</div>
              <div className='cell'>Thu</div>
              <div className='cell'>Fri</div>
              <div className='cell'>Sat</div>
              <div className='cell'>Sun</div>
            </div>
            <div className='row'>
              <div className='cell'>BIO</div>
              <div className='cell'>MAT</div>
              <div className='cell'>BIO</div>
              <div className='cell'>MAT</div>
              <div className='cell'>BIO</div>
              <div className='cell'>MAT</div>
              <div className='cell'>C + T</div>
            </div>
          </div>
        </div>
    </div>
      <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToPosters={scrollToPosters} />
    </div>
  );
};

export default Twelfth;