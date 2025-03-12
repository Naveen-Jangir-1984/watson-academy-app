import './greet.css';

const Greet = ({ state, dispatch }) => {
  return (
    <div className='greet'>
      <div>{state.signin.user.firstname}</div>
    </div>
  );
};

export default Greet;