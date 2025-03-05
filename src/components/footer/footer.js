import './footer.css';

const Footer = ({ state }) => {
  return (
    <div className='footer'>
      <div className='useful-links'>
        <div className='address'>
          <h4>Address</h4>
          <div>
            <div>Serinity Villa-2</div>
            <div>Near MES College</div>
            <div>Zuarinagar - 403726</div>
          </div>
        </div>
        <div className='footer-links'>
          <h4>Links</h4>
          <div>{ state.footerLinks.map((link, i) => <div key={i}>{link.name}</div>) }</div>
        </div>
        <div className='posts'>
          <h4>Recent Posts</h4>
          <div>
            <div className='footer-scroll'>{ state.posts.slice(5).reverse().map((post, i) => <div key={i}>
                <div style={{fontWeight: 'bolder'}}>{post.date}</div>
                <p>{post.title}</p>
                <div style={{fontSize: 'x-small'}}>{post.content}</div>
              </div>) }
            </div>            
          </div>
        </div>
        <div className='timings'>
          <h4>Time Table</h4>
          <div>
            <div>08 AM To 10 AM</div>
            <div>11 PM To 12 PM</div>
            <div>04 PM To 07 PM</div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        <div className='text'>© 2025 Watson All Rights Reserved.</div>
        <div className='visitor'>Visitor Counter: 0</div>
      </div>
    </div>
  );
};

export default Footer;