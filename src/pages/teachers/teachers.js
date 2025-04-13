import './teachers.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Teachers = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='container-left' style={themeStyle}>
      <h2>Our Faculty</h2>
      <p>
        We have dedicated and experienced faculty for each and every subject sourced from Reputed universities and the industry. 
        The best teachers, like the best leaders, have an uncanny ability to step outside themselves and become liberating forces 
        in our lives.
      </p>
      <div>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Teachers/teachers01.jpg`} alt='placeholder' />
        <p>
          So, the best amongst the lot joined hands with us to bring complete understanding of the subject and arsenal 
          of problem-solving techniques for efficient and effective studying.
        </p> 
        <p>
          Our faculty team comprise of perfect blend of academicians and subject experts. They are trained to better 
          the learning process for students.
        </p>
      </div>
      <p>
        We have scientifically designed methodology to filter out best from the existing lot. Regular soft training workshops 
        are held for the faculty members to ensure that teaching methods, subject knowledge, problem solving tricks are always 
        up to the mark. 
      </p>
      <div>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Teachers/teachers02.jpg`} alt='placeholder' />
        <p>
          Constant update of classroom problems as suggested by team is incorporated to make sure that students 
          are exposed to latest and ever changing patterns of these competitive examinations.
        </p>
      </div>
      <h2>Faculty is</h2>
      <ul style={{lineHeight: '1.5rem'}}>
        <li>Well qualified</li>
        <li>Experienced with passion</li>
        <li>Years of experience in industry</li>
        <li>Guest Faculty lecture</li>
        <li>Dedicated for each subject</li>
      </ul>
    </div>
  );
};

export default Teachers;