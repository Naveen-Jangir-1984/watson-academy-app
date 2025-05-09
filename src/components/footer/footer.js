import './footer.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
// const secretKey = process.env.REACT_APP_SECRET_KEY;

// const decryptData = (encryptedData) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

const Footer = ({ state, dispatch, scrollToTop }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  const themeStyleNavigation = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none',
  };
  const themeStyleCards = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke, lightgrey)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none',
  };
  const themeStyleFooter = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none',
  };
  const postsLength = state.posts.length;
  const maxChatPost = 15;
  let randomPosts = [];
  while(randomPosts.length < 5) {
    const random = Math.floor(Math.random() * postsLength);
    if (!randomPosts.includes(random)) {
      randomPosts.push(state.posts[random]);
    }
  }
  const handleClickPage = (page) => {
    dispatch({type: 'SELECT_PAGE', id: page.id});
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
  const handleDeleteFeedback = async () => {
    const consent = window.confirm('Are you sure to delete the feedback?');
    if (!consent) return;
    const response = await fetch(`${uri}:${port}/${resource}/deleteFeedback`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: state.selectedPost.id })})
    const data = await response.json();
    if (data.result === 'success') {
      dispatch({type: 'DELETE_FEEDBACK', id: state.selectedPost.id});
      dispatch({type: 'CLOSE_POST'});
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  }
  return (
    <div className='footer' style={themeStyle}>
      <div className='useful-navigations'>
        <div className='address'>
          <h4>Address</h4>
          <div className='text' style={themeStyleNavigation}>
            <div style={{fontWeight: 'bolder', fontStyle: 'italic', textDecoration: 'underline'}}>Head Office</div>
            <div>2<sup>nd</sup> Floor,</div>
            <div>Gazala Ameen Building,</div>
            <div>Near MES College,</div>
            <div>Dabolim - 403726,</div>
            <div>Goa, MH</div>
            <hr></hr>
            <div style={{fontWeight: 'bolder', fontStyle: 'italic', textDecoration: 'underline'}}>Branch</div>
            <div>Karwar, Goa</div>
          </div>
        </div>
        <div className='footer-navigations'>
          <h4>More Information</h4>
          <div className='text' style={themeStyleNavigation}>{ state.pages.map((page) => 
            page.id > 10 && page.id <= 20 &&
            <div className='link' style={{
              backgroundImage: state.theme === 'cool' && page.isSelected ? 'linear-gradient(to right bottom, lightpink, lightyellow)' : 
              state.theme === 'cool' && !page.isSelected ? 'linear-gradient(to right bottom, lightblue, lightyellow)' :
              state.theme === 'light' && page.isSelected ? 'linear-gradient(to right bottom, #fee, #fee)' : 
              state.theme === 'light' && !page.isSelected ? 'linear-gradient(to right bottom, whitesmoke, lightgrey)' : 'none',
              border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none'
            }} key={page.id} onClick={() => handleClickPage(page)}>
              {page.name}
            </div>)}
          </div>
        </div>
        <div className='posts'>
          <h4>Feedbacks ({postsLength})</h4>
          <div className='posts-scroll-view' style={themeStyleNavigation}>
          <label>
            {
              postsLength ?
              <>
                <div>Recent</div>
                <div style={{fontSize: 'medium'}}>(click on the card for details)</div>
              </> :
              <div>(empty)</div>
            }
          </label>
            { state.selectedPost === '' ? 
              <div className='footer-scroll' style={{ animation: `scrollFooter ${randomPosts.length * 5}s linear infinite normal` }}>{ randomPosts.map((post, i) => 
                <div style={themeStyleCards} key={i} onClick={() => dispatch({type: 'DISPLAY_POST', id: post.id})}>
                  <div style={{fontWeight: 'bolder', fontSize: 'smaller'}}>{post.date}</div>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{marginBottom: '0', fontSize: 'x-small', fontStyle: 'italic'}}>{`${post.message.length > maxChatPost ? post.message.substring(0, maxChatPost) : post.message} ...`}</span>
                    <span style={{textAlign: 'right', fontSize: 'x-small', fontStyle: 'italic'}}>{`${post.by}`}</span>
                  </div>
                </div>) }
              </div> :
              <div className='post-card' style={themeStyle}>
                { state.signin.user ? <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeleteFeedback()} /> : '' }
                <img className='close' src={`${uri}:${port}/images/close.png`} alt='close' onClick={() => dispatch({type: 'CLOSE_POST'})} />
                <h4>{state.selectedPost.date}</h4>
                <div style={{fontSize: 'smaller', fontStyle: 'italic'}}>{`"${state.selectedPost.message}"`}</div>
                <h5 style={{fontSize: 'smaller', textAlign: 'right', fontStyle: 'italic'}}>{`- ${state.selectedPost.by}`}</h5>
              </div>
            }
          </div>
        </div>
        <div className='timings'>
          <h4>Timings</h4>
          <div className='text' style={themeStyleNavigation}>{ state.pages.map((page) => 
            page.id > 20 && page.id <= 30 &&
            <div className='link' style={{
              backgroundImage: state.theme === 'cool' && page.isSelected ? 'linear-gradient(to right bottom, lightpink, lightyellow)' : 
              state.theme === 'cool' && !page.isSelected ? 'linear-gradient(to right bottom, lightblue, lightyellow)' :
              state.theme === 'light' && page.isSelected ? 'linear-gradient(to right bottom, #fee, #fee)' : 
              state.theme === 'light' && !page.isSelected ? 'linear-gradient(to right bottom, whitesmoke, lightgrey)' : 'none',
              border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none'
            }} key={page.id} onClick={() => handleClickPage(page)}>
              {page.name}
            </div>)}
          </div>
        </div>
      </div>
      <div className='copyright'>
        <div className='visitor' style={themeStyleFooter}>{`Visitor Counter ${state.visitors.length}`}</div>
        <div className='message' style={themeStyleFooter}>© 2025 Watson. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;