import './bc.css';

const BC = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='bc' style={themeStyle}>
      <div>VI, VII, VIII, IX & X (Science & Maths)</div>
      <div>XI & XII (Physics, Mathematics, Chemistry & Biology)</div>
    </div>
  );
};

export default BC;