import CLOSE from '../../images/close.png';
import './footer.css';

const Footer = ({ state, dispatch }) => {
  const postsLength = state.posts.length;
  const maxChatPost = 15;
  const handleClickPage = (page) => {
    dispatch({type: 'SELECT_PAGE', id: page.id});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className='footer'>
      <div className='useful-navigations'>
        <div className='address'>
          <h4>Address</h4>
          <div className='text'>
            <div>2<sup>nd</sup> Floor,</div>
            <div>Gazala Ameen Building,</div>
            <div>Near MES College,</div>
            <div>Dabolim - 403726,</div>
            <div>Goa, MH</div>
          </div>
        </div>
        <div className='footer-navigations'>
          <h4>More</h4>
          <div className='text'>{ state.pages.map((page) => 
            page.id > 7 &&
            <div className='link' style={{backgroundColor: page.isSelected ? '#fee' : 'transparent'}} key={page.id} onClick={() => handleClickPage(page)}>
              {page.name}
            </div>)}
          </div>
        </div>
        <div className='posts'>
          <h4>Posts ({postsLength})</h4>
          <div className='posts-scroll-view'>
          <label>
            <div>Recent</div>
            <div style={{fontSize: 'medium'}}>(click on the card for details)</div>
          </label>
            { state.selectedPost === '' ? 
              <div className='footer-scroll' style={{animation: `scroll ${postsLength * 5}s linear infinite normal`}}>{ state.posts.map((post, i) => 
                <div key={i} onClick={() => dispatch({type: 'DISPLAY_POST', id: post.id})}>
                  <div style={{fontWeight: 'bolder', fontSize: 'smaller'}}>{post.date}</div>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{marginBottom: '0', fontSize: 'x-small', fontStyle: 'italic'}}>{`${post.message.length > maxChatPost ? post.message.substring(0, maxChatPost) : post.message} ...`}</span>
                    <span style={{textAlign: 'right', fontSize: 'x-small', fontStyle: 'italic'}}>{`${post.by}`}</span>
                  </div>
                </div>) }
              </div> :
              <div className='post-card'>
                <img className='close' src={CLOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_POST'})} />
                <h4>{state.selectedPost.date}</h4>
                <div style={{fontSize: 'smaller', fontStyle: 'italic'}}>{`"${state.selectedPost.message}"`}</div>
                <h5 style={{fontSize: 'smaller', textAlign: 'right', fontStyle: 'italic'}}>{`- ${state.selectedPost.by}`}</h5>
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
        <div className='visitor'>{`Visitor Counter ${state.visitors.length}`}</div>
        <div className='message'>© 2025 Watson. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;