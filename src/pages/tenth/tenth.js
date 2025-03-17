import './tenth.css';

const Tenth = ({ state }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className='container-left'>
      <div className='title'>Time Table for Class 8<sup>th</sup>, 9<sup>th</sup> and 10<sup>th</sup></div>
      <div className='tenth'>
        {
          state.timetables.map((timetable, i) => (timetable.class === 8 || timetable.class === 9 || timetable.class === 10) &&
          <div className='col' key={i}>
            <div className='row'>
              <div className='cell'>{`Class ${timetable.class}th`}</div>
              <div className='cell'>{`Time ${timetable.hours}`}</div>
            </div>
            <div className='row'>
              { days.map((day, i) => <div key={i} className='cell'>{day}</div>) }
            </div>
            <div className='row'>
              { timetable.subjects.map((subject, i) => <div key={i} className='cell'>{subject}</div>) }
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Tenth;