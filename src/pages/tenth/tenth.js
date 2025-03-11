import './tenth.css';
import ContainerRight from '../../components/container-right/container-right';

const Tenth = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <div className='title'>Time Table for Class 8<sup>th</sup>, 9<sup>th</sup> and 10<sup>th</sup></div>
          <div className='tenth'>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 8th</div>
                <div className='cell'>Time 5:00 - 6:00 PM</div>
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
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 8th</div>
                <div className='cell'>Time 6:00 - 7:00 PM</div>
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
                <div className='cell'>SCI</div>
                <div className='cell'>SCI</div>
                <div className='cell'>SCI</div>
                <div className='cell'>SCI</div>
                <div className='cell'>SCI</div>
                <div className='cell'>SCI</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 9th</div>
                <div className='cell'>Time 5:00 - 6:00 PM</div>
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
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 9th</div>
                <div className='cell'>Time 6:00 - 7:00 PM</div>
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
                <div className='cell'>BIO</div>
                <div className='cell'>CHE</div>
                <div className='cell'>CHE</div>
                <div className='cell'>PHY</div>
                <div className='cell'>PHY</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 10th</div>
                <div className='cell'>Time 5:00 - 6:00 PM</div>
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
                <div className='cell'>BIO</div>
                <div className='cell'>CHE</div>
                <div className='cell'>CHE</div>
                <div className='cell'>PHY</div>
                <div className='cell'>PHY</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='cell'>Class 10th</div>
                <div className='cell'>Time 6:00 - 7:00 PM</div>
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
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>MAT</div>
                <div className='cell'>C + T</div>
              </div>
            </div>
          </div>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Tenth;