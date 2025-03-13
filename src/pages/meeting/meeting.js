import ContainerRight from '../../components/container-right/container-right';
import './meeting.css';

const Meeting = ({ state, dispatch, scrollToTop }) => {
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Meeting</h2> 
        <p>
          As a coaching director, I believe that meetings are an essential tool for collaboration, alignment, 
          and growth. However, the true value of a meeting is not in gathering people together but in ensuring 
          that every discussion leads to action and progress. To make our meetings effective, we must be 
          intentional with our time, structure, and focus. Preparation is key - each participant should come 
          with a clear understanding of the agenda, expected outcomes, and their role in the discussion. 
          Meetings should have a well-defined purpose, whether it's decision-making, problem-solving, 
          or strategic planning.
        </p>
        <p>
          Respecting time is crucial. Meetings should start and end as scheduled, and discussions should remain 
          concise and relevant. Active participation fosters engagement, and every voice should be encouraged 
          while maintaining a results-oriented approach. Clear action items, deadlines, and accountability measures 
          must be established before we conclude. A great meeting inspires clarity, motivation, and progress, 
          ensuring that we move forward together with purpose.
        </p>
      </div>
      <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
    </div>
  );
};

export default Meeting;