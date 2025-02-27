import './footer.css';

const Footer = () => {
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
              <tr>
                <td>Director</td>
              </tr>
              <tr>
                <td>Student Zone</td>
              </tr>
              <tr>
                <td>Report</td>
              </tr>
              <tr>
                <td>Parents</td>
              </tr>
              <tr>
                <td>Image Gallery</td>
              </tr>
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
      <div className='copyright'>Copyright © Watson All Rights Reserved.</div>
    </div>
  );
};

export default Footer;