import './si.css';

const SI = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='container-left' style={themeStyle}>
      <h2>Student Instruction</h2>
      <p>
        Mobile phones should be switched off during class, and on ‘Silent mode’ in the Academy premises.
      </p>
      <p>
        Students should arrive in the class 5 minutes before the class. Students who are late will not 
        be allowed to enter the class.
      </p>
      <p>
        The authorized media of communication between the students and Academy is the Notice Board; 
        the students are expected to read the notice board regularly. The Institute will not be responsible 
        for any loss of the students due to their negligence.
      </p>
      <p>
        Damage to the property of the Academy like tampering with fixtures, will be viewed seriously and 
        cost of damage will be recovered from the concerned students.
      </p>
      <p style={{backgroundColor: '#ddd', lineHeight: '1.5rem', borderRadius: '10px', padding: '1rem', fontStyle: 'italic'}}>
        A student has to attend minimum 80% of the classes during the tenure of the course failing which, 
        unless there are sufficient reasons for such absence with proof, the name of the particular student 
        will be struck off from the register.
      </p>
      <p>
        Students are not permitted to make any request or express their choice for a particular batch or 
        faculty or an instructor of the institute.
      </p>
      <p>
        student who is absent for more than one month and less than 2 month without any intimation will 
        have to pay fine as may be decided by the institute.
      </p>
      <p style={{fontWeight: 'bolder'}}>No refund of fees is permissible under any circumstances.</p>
    </div>
  );
};

export default SI;