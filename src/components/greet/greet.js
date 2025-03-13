import './greet.css';

const Greet = ({ state, dispatch }) => {
  const { firstname, lastname, mobile } = state.signin.user
  return (
    <div className='greet'>
      <div className='user-info'>
        <img className='user-photo' src={require(`../../images/Users/${mobile}.jpg`)} alt='user' />
        <div>{`${firstname} ${lastname}`}</div>
      </div>
      <div className='user-actions'>
        <div>+ Event</div>
        <div>+ News</div>
        <div>+ Poster</div>
      </div>
    </div>
  );
};

export default Greet;