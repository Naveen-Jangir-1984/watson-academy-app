import './twelfth.css';

const Twelfth = ({ state }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className='container-left'>
      <div className='title'>Time Table for Class 11<sup>th</sup> and 12<sup>th</sup></div>
      <div className='twelfth'>
        {
          state.timetables.map((timetable, i) => (timetable.class === 11 || timetable.class === 12) &&
          <div className='col' key={i}>
            <>
              <div className='row'>
                { 
                  <>
                  <div className='cell'>{`Class ${timetable.class}th`}</div>
                  <div className='cell'>{`Time ${timetable.hours}`}</div>
                  </>
                }
              </div>
              <div className='row'>
                { days.map((day, i) => <div key={i} className='cell'>{day}</div>) }
              </div>
              <div className='row'>
                { timetable.subjects.map((subject, i) => <div key={i} className='cell'>{subject}</div>) }
              </div>
            </>
          </div>)
        }
      </div>
    </div>
  );
};

export default Twelfth;