import './sixth.css';

const Sixth = ({ state }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className='container-left'>
      <div className='title'>Time Table for Class 6<sup>th</sup> and 7<sup>th</sup></div>
        <div className='sixth'>
          {
            state.timetables.map((timetable, i) => (timetable.class === 6 || timetable.class === 7) &&
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

export default Sixth;