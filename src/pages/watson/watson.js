import { lazy, Suspense } from 'react';
import WATSON01 from '../../images/Watson/watson01.jpg';
import WATSON02 from '../../images/Watson/watson02.jpg';
import ClOSE from '../../images/close.png';
import ContainerRight from '../../components/container-right/container-right';
import './watson.css';
const PI = lazy(() => import('../parent_instruction/pi'));
const SI = lazy(() => import('../student_instruction/si'));

const Watson = ({ state, dispatch }) => {
  const selectedInstruction = state.instructions.filter(instruction => instruction.isSelected);
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Still confused why to trust us?</h2>
        <p>
          <b>Highly qualified and experienced teachers</b> handle the subjects effectively and efficiently and also make sure that 
          every student get proper individual attention. Parents are <b>regularly informed</b> about their children’s progress and performance.
        </p>
        <p>
          <img className='left-aligned-image' src={WATSON01} alt='placeholder' />
          We at Watson Academy follow <b>up-to-date and regularly revised teaching methods</b> and syllabus to keep pace with the 
          new pattern to make sure that it keeps up with the evolving examinations patters and also keep our students ahead
          in this race to the finish divine.
          <p>
            Presentation of the subjects is in a systematic and logical manner to enable the students to comprehend the 
            structure and substance of the concepts.
          </p>
          <p>
            Concentration on exam-oriented appreciable number of quadivty problems to provide a firm grounding for 
            students in various subjects and to face the professional exams with high confidence.
          </p>
        </p>
        <h4>Click below buttons to explore more...</h4>
        <div className='container-left-top'>
          { state.instructions.map((instruction, i) => 
          <div 
            key={i} 
            style={{backgroundColor: instruction.isSelected ? '#fee' : 'transparent'}}
            className='container-link'
            onClick={() => dispatch({type: 'SELECT_INSTRUCTION', index: i})}
          >
            <img src={instruction.logo} style={{width: '20px', height: '20px'}} alt='placeholder' />
            <div>{instruction.name}</div>
          </div>)}
        </div>
        <div className='slider' style={{ display: selectedInstruction.length ? 'flex' : 'none' }}>
          <img className='slider-close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'DESELECT_INSTRUCTION'})} />
          { selectedInstruction.length && selectedInstruction[0].name !== undefined && <div className='slider-title'>{selectedInstruction[0].name}</div>}
          <Suspense fallback={<div className='loading'>Loading...</div>}>
            { selectedInstruction.length && selectedInstruction[0].name === 'Parent Instruction' && <PI /> }
            { selectedInstruction.length && selectedInstruction[0].name === 'Student Instruction' && <SI /> }
          </Suspense>
        </div>
        <p>
          Systematic exploring of syllabus in a scheduled time frame without sacrificing quadivty and number of classes.
          Workable strategy and <b>Time Management scheme</b> for exam preparation.
        </p>
        <p>
          <img className='left-aligned-image' src={WATSON02} alt='placeholder' />
          Cooperative and supporting teachers for last minute assistance before examinations. <b>Concept-driven approach
          </b> which exposes students to all types of problems asked.
          <p>
            <b>Special attention to the doubts</b> of students and making sure that they understand the basic concepts.
            <b>Regular tests</b> are designed for the students to understand the stress and time-pressure conditions which 
            expected to be faced in the actual examinations.
          </p>
          <p>
            <b>Well paced lectures</b> starting with basic concepts and gradually culminating in entrance level problems.
            Continuous <b>Feedback Mechanism</b> in place so as to improve on any shortcomings whatsoever as soon as possible.
            Result oriented and dedicated faculty well equipped with knowledge regarding the subjects. Stringent 
            <b>selection criteria for faculty</b> so as to give the best to the students. We customize each subject learning 
            objectives depending on the learning gaps of the student and plan a lesson structure that would complement 
            their individual needs.
          </p> 
        </p>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Watson;