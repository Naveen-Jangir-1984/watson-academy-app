import './sc.css';

const SC = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='sc' style={themeStyle}>
      <div>NEET Crash Course</div>
      <div>GCET/JEE Crash Course</div>
      <div>Foundation Courses</div>
    </div>
  );
};

export default SC;