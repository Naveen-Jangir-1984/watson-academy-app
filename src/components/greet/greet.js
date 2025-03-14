import { useState } from 'react';
import CryptoJS from 'crypto-js';

import './greet.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
const secretKey = process.env.REACT_APP_SECRET_KEY;

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const Greet = ({ state, dispatch }) => {
  const { firstname, lastname, mobile } = state.signin.user
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if(e.target.files.length > 0) {
      setFile(e.target.files[0]);
      e.target.value = '';
    }
  };
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);    
    const response = await fetch(`${uri}:${port}/${resource}/addPoster`, {
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    })
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      setFile(null);
      dispatch({type: 'OPEN_BANNER', message: 'File Uploaded !'});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
        window.location.reload();
      }, 5000);
    }
  };
  return (
    <div className='greet'>
      <div>
        <div className='user-info'>
          <img className='user-photo' src={require(`../../images/Users/${mobile}.jpg`)} alt='user' />
          <div>{`${firstname} ${lastname}`}</div>
        </div>
        <div className='user-actions'>
          <div>+ Event</div>
          <div>+ News</div>
          <input type='file' id='hiddenFileInput' style={{display: 'none'}} accept='.jpg' onChange={handleFileChange} />
          <div onClick={() => {document.getElementById('hiddenFileInput').click()}}>+ Poster</div>
        </div>
      </div>
      <div style={{display: file ? 'block' : 'none'}}>
        <div className='user-actions'>
          { file && <span style={{fontSize: 'x-small'}}>{`Upload '${file.name}'?`}</span> }
          { file && <div onClick={handleUpload}>Yes</div> }
          { file && <div onClick={() => setFile(null)}>No</div> }
        </div>
      </div>
    </div>
  );
};

export default Greet;