import './footer.css';

const Footer = ({ state }) => {
  return (
    <div className='footer'>
      <div className='useful-links'>
        <div className='address'>
          <h4>Address</h4>
          <table>
            <tbody>
              <tr>
                <td><b>Country</b></td>
                <td>India</td>
              </tr>
              <tr>
                <td><b>State</b></td>
                <td>Maharashtra</td>
              </tr>
              <tr>
                <td><b>City</b></td>
                <td>Goa</td>
              </tr>
              <tr>
                <td><b>Address</b></td>
                <td>
                  <div>Serinity Villa-2</div>
                  <div>Near MES College</div>
                  <div>Zuarinagar - 403726</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='footer-links'>
          <h4>Links</h4>
          <table>
            <tbody>
              {
                state.footerLinks.map((link, i) => (
                  <tr key={i}>
                    <td>{link.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='posts'>
          <h4>Recent Posts</h4>
          <table>
            <tbody>
              {
                state.posts.slice(5).reverse().map((post, i) => (
                  <tr key={i}>
                    <td>{post.title}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='timings'>
          <h4>Timings</h4>
          <table>
            <tbody>
              <tr>
                <td>Time Table 8am To 10am</td>
              </tr>
              <tr>
                <td>Time Table 11am To 12pm</td>
              </tr>
              <tr>
                <td>Meeting Time 4am To 7pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='copyright'>
        <div className='text'>Copyright © Watson All Rights Reserved.</div>
        <div className='users'>User Visits: ??</div>
      </div>
    </div>
  );
};

export default Footer;