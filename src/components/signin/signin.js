import './signin.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const SignIn = ({ state, dispatch, scrollToTop }) => {
  const { username, password, error } = state.signin.inputs;
  const handleCloseSignIn = () => {
    handleClearSignIn();
    dispatch({type: 'CLOSE_SIGNIN'});
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
  const handleSignInInputs = (e) => {
    const element = e.target;
    dispatch({type: 'INPUT_SIGNIN', attribute: element.name, value: element.value});
  }
  const handleClearSignIn = () => {
    dispatch({type: 'INPUT_SIGNIN', attribute: 'username', value: ''});
    dispatch({type: 'INPUT_SIGNIN', attribute: 'password', value: ''});
    dispatch({type: 'INPUT_SIGNIN', attribute: 'error', value: ''});
  }
  const handleSubmitSignIn = () => {
    dispatch({type: 'SIGNIN', username: username, password: password});
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
  const disableButtonClear = username === '' && password === '';
  const disableButtonSubmit = username === '' || password === '';
  return (
    <div className='login'>
      <div className='login-bgd'></div>
      <div className='panel'>
        <div>Sign In</div>
        <img className='login-close' src={`${uri}:${port}/images/close.png`} alt='close' onClick={() => handleCloseSignIn()} />
        <div className='username'>
          <input name='username' type='text' value={username} placeholder='mobile / email' onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className='password'>
          <input name='password' type='password' value={password} placeholder='password' onChange={(e) => handleSignInInputs(e)} />
        </div>
        <div className='actions'>
          <button type='button' style={{pointerEvents: disableButtonClear ? 'none' : 'all'}} disabled={disableButtonClear} onClick={() => handleClearSignIn()}>Clear</button>
          <button type='button' style={{pointerEvents: disableButtonSubmit ? 'none' : 'all'}} disabled={disableButtonSubmit} onClick={() => handleSubmitSignIn()}>Submit</button>
        </div>
        { error ? <div className='error'>{error}</div> : '' }
      </div>
    </div>
  );
};

export default SignIn;