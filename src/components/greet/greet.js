import './greet.css';

const Greet = ({ state, dispatch }) => {
  const { firstname, lastname } = state.signin.user
  return (
    <div className='greet'>
      <div>{`${firstname} ${lastname}`}</div>
    </div>
  );
};

export default Greet;