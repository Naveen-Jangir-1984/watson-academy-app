import CryptoJS from 'crypto-js';
import { useState } from 'react';
import './tenth.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
const secretKey = process.env.REACT_APP_SECRET_KEY;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const Tenth = ({ state, dispatch }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let hours = [];
  for(let i=0; i<=24; i++) {
    hours.push(i < 10 ? `0${i}` : i);
  }
  const [editTimeTable, setEditTimeTable] = useState({
    id: 0,
    standard: 0,
    start: '',
    startHour: '',
    end: '',
    endHour: '',
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: ''
  });
  const handleEditTimeTable = (timetable) => {
    setEditTimeTable({
      id: timetable.id,
      standard: timetable.standard,
      start: timetable.start,
      startHour: timetable.startHour,
      end: timetable.end,
      endHour: timetable.endHour,
      mon: timetable.subjects[0],
      tue: timetable.subjects[1],
      wed: timetable.subjects[2],
      thu: timetable.subjects[3],
      fri: timetable.subjects[4],
      sat: timetable.subjects[5],
      sun: timetable.subjects[6]
    });
  };
  const handleCancelTimeTable = () => {
    setEditTimeTable({
      id: 0,
      standard: 0,
      start: '',
      startHour: '',
      end: '',
      endHour: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: ''
    });
  };
  const handleUpdateTimeTable = async () => {
    const consent = window.confirm('Are you sure to update timetable?');
    if (!consent) return;
    const hours = `${Number(editTimeTable.start) > 12 ? (Number(editTimeTable.start) - 12) : editTimeTable.start}:${editTimeTable.startHour} ${Number(editTimeTable.start) > 12 ? 'PM' : 'AM'} - ${Number(editTimeTable.end) > 12 ? (Number(editTimeTable.end) - 12) : editTimeTable.end}:${editTimeTable.endHour} ${Number(editTimeTable.end) > 12 ? 'PM' : 'AM'}`;
    const post = {
      id: editTimeTable.id,
      standard: editTimeTable.standard,
      hours: hours,
      start: editTimeTable.start,
      startHour: editTimeTable.startHour,
      end: editTimeTable.end,
      endHour: editTimeTable.endHour,
      subjects: [editTimeTable.mon, editTimeTable.tue, editTimeTable.wed, editTimeTable.thu, editTimeTable.fri, editTimeTable.sat, editTimeTable.sun]
    }
    const response = await fetch(`${uri}:${port}/${resource}/updateTimeTable`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timetable: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'UPDATE_TIMETABLE', timetable: post});
      handleCancelTimeTable();
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const disableButtonUpdate = editTimeTable.standard === 0 || editTimeTable.start === '' || editTimeTable.startHour === '' || editTimeTable.end === '' || editTimeTable.endHour === '' ||
  editTimeTable.mon === '' || editTimeTable.tue === '' || editTimeTable.wed === '' || editTimeTable.thu === '' || editTimeTable.fri === '' || editTimeTable.sat === '' || editTimeTable.sun === '';
  return (
    <div className='container-left'>
      <div className='title'>Time Table for Class 8<sup>th</sup>, 9<sup>th</sup> and 10<sup>th</sup></div>
        <div className='tenth'>
          {
            state.timetables.map((timetable, i) => (timetable.standard === 8 || timetable.standard === 9 || timetable.standard === 10) &&
            <div key={i}>
              { state.signin.user && <div className='table-actions'>
                  { editTimeTable.id === timetable.id && <button onClick={() => handleCancelTimeTable()}>Cancel</button> }
                  { editTimeTable.id === timetable.id && <button disabled={disableButtonUpdate} onClick={() => handleUpdateTimeTable()}>Update</button> }
                  { editTimeTable.id !== timetable.id && <button onClick={() => handleEditTimeTable(timetable)}>Edit</button> }
                </div>
              }
              <div className='col'>
                <div className='row'>
                  { editTimeTable.id !== timetable.id && <div style={{width: '28%'}} className='cell'>{`Class ${timetable.standard}th`}</div> }
                  { editTimeTable.id === timetable.id && <div style={{width: '28%'}} className='cell'>
                    <select className='dropdown-time' style={{width: '100%'}} name='standard' value={editTimeTable.standard} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: Number(e.target.value) })}>
                      <option value=''>--</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </div> }
                  { editTimeTable.id !== timetable.id && <div style={{width: '72%'}} className='cell'>{`Time ${Number(timetable.start) > 12 ? (Number(timetable.start) - 12) : timetable.start}:${timetable.startHour} ${Number(timetable.start) > 12 ? 'PM' : 'AM'} - ${Number(timetable.end) > 12 ? (Number(timetable.end) - 12) : timetable.end}:${timetable.endHour} ${Number(timetable.end) > 12 ? 'PM' : 'AM'}`}</div> }
                  { editTimeTable.id === timetable.id && <div style={{width: '72%'}} className='cell'>
                    <select className='dropdown-time' name='start' value={editTimeTable.start} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>--</option>
                      { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                    </select>
                    <select className='dropdown-time' name='startHour' value={editTimeTable.startHour} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>--</option>
                      <option value='00'>00</option>
                      <option value='30'>30</option>
                    </select>
                    <select className='dropdown-time' name='end' value={editTimeTable.end} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>--</option>
                      { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                    </select>
                    <select className='dropdown-time' name='endHour' value={editTimeTable.endHour} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>--</option>
                      <option value='00'>00</option>
                      <option value='30'>30</option>
                    </select>                  
                  </div> }
                </div>
                <div className='row'>
                  { days.map((day, i) => <div key={i} className='cell'>{day}</div>) }
                </div>
                <div className='row'>
                  { editTimeTable.id !== timetable.id && timetable.subjects.map((subject, i) => <div key={i} className='cell'>{subject}</div>) }
                  { editTimeTable.id === timetable.id && 
                    <>
                      <div className='cell'>
                        <select className='dropdown-subject' name='mon' value={editTimeTable.mon} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                          <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='tue' value={editTimeTable.tue} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='wed' value={editTimeTable.wed} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='thu' value={editTimeTable.thu} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='fri' value={editTimeTable.fri} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='sat' value={editTimeTable.sat} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='sun' value={editTimeTable.sun} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>--</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>)
          }
        </div>
    </div>
  );
};

export default Tenth;