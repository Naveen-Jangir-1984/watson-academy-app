import TEACHERS01 from '../../images/Teachers/teachers01.jpg';
import TEACHERS02 from '../../images/Teachers/teachers02.jpg';
import ContainerRight from '../../components/container-right/container-right';
import './teachers.css';

const Teachers = ({ state, dispatch, scrollToTop, scrollToEvents, scrollToNews, scrollToPosters }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Our Faculty</h2>
        <p>
          We have dedicated and experienced faculty for each and every subject sourced from Reputed universities and the industry. 
          The best teachers, like the best leaders, have an uncanny ability to step outside themselves and become liberating forces 
          in our lives.
        </p>
        <div>
          <img className='left-aligned-image' src={TEACHERS01} alt='placeholder' />
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
          <img className='left-aligned-image' src={TEACHERS02} alt='placeholder' />
          <p>
            Constant update of classroom problems as suggested by team is incorporated to make sure that students 
            are exposed to latest and ever changing patterns of these competitive examinations.
          </p>
        </div>
        <h2>Faculty are</h2>
        <ul style={{lineHeight: '1.5rem'}}>
          <li>Well qualified</li>
          <li>Experienced with passion</li>
          <li>Years of experience in industry</li>
          <li>Guest Faculty lecture</li>
          <li>Dedicated for each subject</li>
        </ul>
      </div>
      <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} />
    </div>
  );
};

export default Teachers;