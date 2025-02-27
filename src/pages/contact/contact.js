import './contact.css';

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact-form'>
        <h3>Write Us</h3>
        <div className='form-template'>
          <div className='form-name'>
            <label>Name</label>
            <input type='text' />
          </div>
          <div className='form-email'>
            <label>Email</label>
            <input type='email' />
          </div>
          <div className='form-message'>
            <label>Message</label>
            <textarea></textarea>
          </div>
          <div className='form-buttons'>
            <div></div>
            <button>Send</button>
          </div>
        </div>
      </div>
      <div className='contact-info'>
        <div className='info-academy'>
          <h4>Meet At Our Academy</h4>
          <div>Serinity Villa-2, Near MES</div>
          <div>College, Zuarinagar - 403726</div>
          <div>Near MES Collage, South Goa</div>
        </div>
        <div className='info-touch'>
          <h4>Get in touch</h4>
          <a href='email:watsonacad@gmail.com'>watsonacad@gmail.com</a>
          <a href='tel:9767940053'>9767940053</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;