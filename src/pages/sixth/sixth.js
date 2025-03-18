import CryptoJS from 'crypto-js';
import { useState } from 'react';
import './sixth.css';

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

const Sixth = ({ state, dispatch }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const standards = [6, 7];
  const [newTimeTable, setNewTimeTable] = useState({
    index: -1,
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
  let hours = [];
  for(let i=0; i<=24; i++) {
    hours.push(i < 10 ? `0${i}` : i);
  }
  const minutes = ['00', '30'];
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
  const handleDeleteTimeTable = async (id) => {
    const consent = window.confirm('Are you sure to delete timetable?');
    if (!consent) return;
    const response = await fetch(`${uri}:${port}/${resource}/deleteTimeTable`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: encryptData(id) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'DELETE_TIMETABLE', id: id});
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const handleNewTimeTable = (index) => {
    setNewTimeTable({
      ...newTimeTable,
      index: index
    });
  };
  const handleCancelNewTimeTable = () => {
    setNewTimeTable({
      index: -1,
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
  const handleClearNewTimeTable = () => {
    setNewTimeTable({
      ...newTimeTable,
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
  const disableButtonUpdate = editTimeTable.standard === 0 || editTimeTable.start === '' || editTimeTable.startHour === '' || editTimeTable.end === '' || editTimeTable.endHour === '' ||
  editTimeTable.mon === '' || editTimeTable.tue === '' || editTimeTable.wed === '' || editTimeTable.thu === '' || editTimeTable.fri === '' || editTimeTable.sat === '' || editTimeTable.sun === '';
  const handleSubmitNewTimeTable = async () => {
    const consent = window.confirm('Are you sure to add timetable?');
    if (!consent) return;
    const timetableIds = state.timetables.map(timetable => timetable.id);
    let randomId = Math.floor(Math.random() * 1000) - 1;
    while(timetableIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000) - 1;
    };
    const hours = `${Number(newTimeTable.start) > 12 ? (Number(newTimeTable.start) - 12) : newTimeTable.start}:${newTimeTable.startHour} ${Number(newTimeTable.start) > 12 ? 'PM' : 'AM'} - ${Number(newTimeTable.end) > 12 ? (Number(newTimeTable.end) - 12) : newTimeTable.end}:${newTimeTable.endHour} ${Number(newTimeTable.end) > 12 ? 'PM' : 'AM'}`;
    const post = {
      id: randomId,
      standard: newTimeTable.standard,
      hours: hours,
      start: newTimeTable.start,
      startHour: newTimeTable.startHour,
      end: newTimeTable.end,
      endHour: newTimeTable.endHour,
      subjects: [newTimeTable.mon, newTimeTable.tue, newTimeTable.wed, newTimeTable.thu, newTimeTable.fri, newTimeTable.sat, newTimeTable.sun]
    }
    const response = await fetch(`${uri}:${port}/${resource}/addTimeTable`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index: encryptData(newTimeTable.index + 1), timetable: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_TIMETABLE', index: newTimeTable.index + 1, timetable: post});
      handleCancelNewTimeTable();
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const disableButtonAdd = newTimeTable.standard === 0 || newTimeTable.start === '' || newTimeTable.startHour === '' || newTimeTable.end === '' || newTimeTable.endHour === '' ||
  newTimeTable.mon === '' || newTimeTable.tue === '' || newTimeTable.wed === '' || newTimeTable.thu === '' || newTimeTable.fri === '' || newTimeTable.sat === '' || newTimeTable.sun === '';
  return (
    <div className='container-left'>
      <div className='title'>Time Table for Class 6<sup>th</sup> and 7<sup>th</sup></div>
        <div className='sixth'>
          {
            state.timetables.map((timetable, i) => (timetable.standard === 6 || timetable.standard === 7) &&
            <div key={i}>
              { state.signin.user && <div className='table-actions'>
                  { editTimeTable.id === timetable.id && <button onClick={() => handleCancelTimeTable()}>Cancel</button> }
                  { editTimeTable.id === timetable.id && <button disabled={disableButtonUpdate} onClick={() => handleUpdateTimeTable()}>Update</button> }
                  { editTimeTable.id !== timetable.id && <button style={{backgroundColor: 'gold'}} onClick={() => handleEditTimeTable(timetable)}>Edit</button> }
                  { editTimeTable.id !== timetable.id && <button style={{backgroundColor: '#f88'}} onClick={() => handleDeleteTimeTable(timetable.id)}>Delete</button> }
                </div>
              }
              <div className='col'>
                <div className='row'>
                  { editTimeTable.id !== timetable.id && <div style={{width: '28%'}} className='cell'>{`Class ${timetable.standard}th`}</div> }
                  { editTimeTable.id === timetable.id && <div style={{width: '28%'}} className='cell'>
                    <select className='dropdown-time' style={{width: '100%'}} name='standard' value={editTimeTable.standard} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: Number(e.target.value) })}>
                      <option value=''>- -</option>
                      { standards.map((standard, i) => <option key={i} value={standard}>{standard}</option> )}
                    </select>
                  </div> }
                  { editTimeTable.id !== timetable.id && <div style={{width: '72%'}} className='cell'>{`Time ${Number(timetable.start) > 12 ? (Number(timetable.start) - 12) : timetable.start}:${timetable.startHour} ${Number(timetable.start) > 12 ? 'PM' : 'AM'} - ${Number(timetable.end) > 12 ? (Number(timetable.end) - 12) : timetable.end}:${timetable.endHour} ${Number(timetable.end) > 12 ? 'PM' : 'AM'}`}</div> }
                  { editTimeTable.id === timetable.id && <div style={{width: '72%'}} className='cell'>
                    <select className='dropdown-time' name='start' value={editTimeTable.start} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                      { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                    </select>
                    <select className='dropdown-time' name='startHour' value={editTimeTable.startHour} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                      { minutes.map((minute, i) => <option key={i}>{minute}</option>) }
                    </select>
                    <select className='dropdown-time' name='end' value={editTimeTable.end} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                      { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                    </select>
                    <select className='dropdown-time' name='endHour' value={editTimeTable.endHour} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                      { minutes.map((minute, i) => <option key={i}>{minute}</option>) }
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
                          <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='tue' value={editTimeTable.tue} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='wed' value={editTimeTable.wed} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='thu' value={editTimeTable.thu} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='fri' value={editTimeTable.fri} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='sat' value={editTimeTable.sat} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                      <div className='cell'>
                        <select className='dropdown-subject' name='sun' value={editTimeTable.sun} onChange={(e) => setEditTimeTable({ ...editTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                          { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                        </select>
                      </div>
                    </>
                  }
                </div>
                <div className='table-actions'>
                  { state.signin.user && newTimeTable.index < 0 && <button style={{backgroundColor: 'lightgreen'}} onClick={() => handleNewTimeTable(i)}>+ Time Table</button> }
                </div>
              </div>
              {
                newTimeTable.index === i && 
                <div className='col'>
                  <div className='table-actions'>
                    { newTimeTable.index === i && <button onClick={() => handleCancelNewTimeTable()}>Cancel</button> }
                    { newTimeTable.index === i && <button onClick={() => handleClearNewTimeTable()}>Clear</button> }
                    { newTimeTable.index === i && <button disabled={disableButtonAdd} onClick={() => handleSubmitNewTimeTable()}>Submit</button> }
                  </div>
                  <div className='row'>
                    <div style={{width: '28%'}} className='cell'>
                      <select className='dropdown-time' style={{width: '100%'}} name='standard' value={newTimeTable.standard} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: Number(e.target.value) })}>
                        <option value=''>- class -</option>
                        { standards.map((standard, i) => <option key={i} value={standard}>{standard}</option> )}
                      </select>
                    </div>
                    <div style={{width: '72%'}} className='cell'>
                      <select className='dropdown-time' name='start' value={newTimeTable.start} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- HH -</option>
                        { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                      </select>
                      <select className='dropdown-time' name='startHour' value={newTimeTable.startHour} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- MM -</option>
                        { minutes.map((minute, i) => <option key={i}>{minute}</option>) }
                      </select>
                      <select className='dropdown-time' name='end' value={newTimeTable.end} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- HH -</option>
                        { hours.map((hh, i) => <option key={i} value={hh}>{hh}</option>) }
                      </select>
                      <select className='dropdown-time' name='endHour' value={newTimeTable.endHour} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- MM -</option>
                        { minutes.map((minute, i) => <option key={i}>{minute}</option>) }
                      </select>                  
                    </div>
                  </div>
                  <div className='row'>
                    { days.map((day, i) => <div key={i} style={{fontStyle: 'italic'}} className='cell'>{day}</div>) }
                  </div>
                  <div className='row'>
                    <div className='cell'>
                      <select className='dropdown-subject' name='mon' value={newTimeTable.mon} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                        <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                    <div className='cell'>
                      <select className='dropdown-subject' name='tue' value={newTimeTable.tue} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>  
                    <div className='cell'>
                      <select className='dropdown-subject' name='wed' value={newTimeTable.wed} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                    <div className='cell'>
                      <select className='dropdown-subject' name='thu' value={newTimeTable.thu} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                    <div className='cell'>
                      <select className='dropdown-subject' name='fri' value={newTimeTable.fri} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                    <div className='cell'>
                      <select className='dropdown-subject' name='sat' value={newTimeTable.sat} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                    <div className='cell'>
                      <select className='dropdown-subject' name='sun' value={newTimeTable.sun} onChange={(e) => setNewTimeTable({ ...newTimeTable, [e.target.name]: e.target.value })}>
                      <option value=''>- -</option>
                        { state.subjects.map((subject, i) => <option key={i} value={subject.code}>{subject.name}</option>) }
                      </select>
                    </div>
                  </div>
                </div>
              }
            </div>)
          }
        </div>
    </div>
  );
};

export default Sixth;