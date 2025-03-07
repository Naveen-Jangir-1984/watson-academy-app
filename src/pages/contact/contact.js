import CONTACT01 from '../../images/Contact/contact01.jpg';
import ContainerRight from '../../components/container-right/container-right';
import './contact.css';

const Contact = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Dear Parents</h2>
        <p>
          We kindly invite you to leave a message regarding your address details to ensure smooth communication and coordination. 
          Providing accurate address information helps us in better planning and ensuring timely updates when needed.
          <p>
            <img className='left-aligned-image' src={CONTACT01} alt='placeholder' />
            Please feel free to share any additional details or special instructions that may assist us. Your cooperation is greatly appreciated!
          </p>
        </p>
        <h2>Write to Us</h2>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' placeholder='mandatory' />
        </div>
        <div className='form-email'>
          <label>Email</label>
          <input type='text' placeholder='mandatory' />
        </div>
        <div className='form-message'>
          <label>Message</label>
          <textarea maxLength={50} placeholder='50 characters only' />
        </div>
        <div className='form-actions'>
          <button>Clear</button>
          <button>Submit</button>
        </div>
      <h2>Feedback for Us</h2>
      <div className='form-name'>
        <label>Name</label>
        <input type='text' placeholder='mandatory' />
      </div>
      <div className='form-email'>
        <label>Class</label>
        <input type='text' placeholder='optional' />
      </div>
      <div className='form-message'>
        <label>Feedback</label>
        <textarea maxLength={50} placeholder='50 characters only (mandatory)' />
      </div>
      <div className='form-actions'>
        <button>Clear</button>
        <button>Submit</button>
      </div>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Contact;