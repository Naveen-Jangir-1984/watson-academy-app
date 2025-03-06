import TEACHERS01 from '../../images/Teachers/teachers01.jpg';
import TEACHERS02 from '../../images/Teachers/teachers02.jpg';
import ContainerRight from '../../components/container-right/container-right';
import './teachers.css';

const Teachers = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Our Faculty</h2>
        <p>
          We have dedicated and experienced faculty for each and every subject sourced from Reputed universities and the industry. 
          The best teachers, like the best leaders, have an uncanny ability to step outside themselves and become liberating forces 
          in our lives.
        </p> 
        <p>
          <img className='left-aligned-image' src={TEACHERS01} alt='placeholder' />
          So, the best amongst the lot joined hands with us to bring complete understanding of the subject and arsenal 
          of problem-solving techniques for efficient and effective studying. 
          <p>
            Our faculty team comprise of perfect blend of academicians and subject experts. They are trained to better 
            the learning process for students.
          </p>
        </p>
        <p>
          We have scientifically designed methodology to filter out best from the existing lot. Regular soft training workshops 
          are held for the faculty members to ensure that teaching methods, subject knowledge, problem solving tricks are always 
          up to the mark. 
        </p>
        <p>
          <img className='left-aligned-image' src={TEACHERS02} alt='placeholder' />
          Constant update of classroom problems as suggested by team is incorporated to make sure that students 
          are exposed to latest and ever changing patterns of these competitive examinations.
        </p>
        <h2>Faculty are</h2>
        <ul>
          <li><p>Well qualified</p></li>
          <li><p>Experienced with passion</p></li>
          <li><p>Years of experience in industry</p></li>
          <li><p>Guest Faculty lecture</p></li>
          <li><p>Dedicated for each subject</p></li>
        </ul>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Teachers;