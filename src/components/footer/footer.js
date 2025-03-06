import CLOSE from '../../images/close.png';
import './footer.css';

const Footer = ({ state, dispatch }) => {
  return (
    <div className='footer'>
      <div className='useful-navigations'>
        <div className='address'>
          <h4>Address</h4>
          <div className='text'>
            <div>Serinity Villa-2</div>
            <div>Near MES College</div>
            <div>Zuarinagar - 403726</div>
          </div>
        </div>
        <div className='footer-navigations'>
          <h4>Links</h4>
          <div className='text'>{ state.footerLinks.map((link, i) => <div key={i}>{link.name}</div>) }</div>
        </div>
        <div className='posts'>
          <h4>Recent Posts</h4>
          <div>
            { state.selectedPost === '' ? 
              <div className='footer-scroll'>{ state.posts.map((post, i) => 
                <div key={i} onClick={() => dispatch({type: 'DISPLAY_POST', id: post.id})}>
                  <div style={{fontWeight: 'bolder'}}>{post.date}</div>
                  <p style={{marginBottom: '0', fontSize: 'x-small'}}>{post.content}</p>
                </div>) }
              </div> :
              <div className='post-card'>
                <img className='close' src={CLOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_POST'})} />
                <h4>{state.selectedPost.date}</h4>
                <p>{state.selectedPost.content}</p>
                <div style={{textAlign: 'right'}}>{state.selectedPost.by}</div>
              </div>
            }
          </div>
        </div>
        <div className='timings'>
          <h4>Time Table</h4>
          <div className='text'>
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