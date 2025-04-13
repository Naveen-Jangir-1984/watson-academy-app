import './sf.css';

const SF = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='sf' style={themeStyle}>
      <div>- Container focus on Basics</div>
      <div>- No Mug-ups</div>
      <div>- Doubt sessions / Weekly Tests</div>
      <div>- Regular PTM</div>
      <div>- Personal attention to students</div>
      <div>- Taught by expertise faculties</div>
      <div>- Test series before exams</div>
    </div>
  );
};

export default SF;