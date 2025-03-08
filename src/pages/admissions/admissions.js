import ADMISSIONS01 from '../../images/Admissions/admissions01.jpg';
import ContainerRight from '../../components/container-right/container-right';
import './admissions.css';

const Admissions = ({ state, dispatch }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Admissions</h2> 
        <p>
          Obviously this factor become most and most important in today’s scenario as in school we aren not 
          able to understand the things, not because there are bad teachers but because of large strength 
          they shy to ask their doubts.
        </p>
        <p>
          <img className='left-aligned-image' src={ADMISSIONS01} alt='placeholder' />
          Because of large strengths personal attention cannot be given irrespective of how good the teacher is. 
          This is practically right.
        </p>
        <p>
          If student doesn’t ask his/her doubts in 15 students also then teachers can also understand from 
          the face of students. If it has been large then it won’t be practically possible. Syllabus will have its pace.
        </p>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Admissions;