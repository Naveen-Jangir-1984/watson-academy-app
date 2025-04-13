import './admissions.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Admissions = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='container-left' style={themeStyle}>
      <h2>Admissions</h2>
      <h4>Batch strength max of 15 students</h4>
      <p>
        Obviously this factor become most and most important in today’s scenario as in school we aren not 
        able to understand the things, not because there are bad teachers but because of large strength 
        they shy to ask their doubts.
      </p>
      <p>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Admissions/admissions01.jpg`} alt='placeholder' />
        Because of large strengths personal attention cannot be given irrespective of how good the teacher is. 
        This is practically right.
        If student doesn’t ask his/her doubts in 15 students also then teachers can also understand from 
        the face of students. If it has been large then it won’t be practically possible. Syllabus will have its pace.
      </p>
      <h4>Registration Process</h4>
      <p>
        Students can enroll into our Coaching by collecting the "Registration form" from our academy. Registration is 
        confirmed soon after the payment is confirmed.
      </p>
      <h4>Documents Required for Registration</h4>
      <ul style={{lineHeight: '1.5rem'}}>
        <li>Candidate Personal information (name, date of birth, your personal mobile number etc)</li>
        <li>Parents Personal information (parents name, parents mobile number etc.)</li>
        <li>Good quality image of your photograph</li>
      </ul>
    </div>
  );
};

export default Admissions;