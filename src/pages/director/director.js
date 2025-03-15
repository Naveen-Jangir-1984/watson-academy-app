import ContainerRight from '../../components/container-right/container-right';
import DIRECTOR01 from '../../images/Director/director01.jpg';
import './director.css';

const Director = ({ state, dispatch, scrollToTop, scrollToEvents, scrollToNews, scrollToPosters }) => {
  return (
    <div className='container'>
      <div className='container-left'>
      <h2>Message from Director</h2>
      <p>
        We aspire to make our students excel in terms of thought, ideology and performance. 
        To achieve this, I and my faculty work with commitment and dedication. With such an 
        endeavor, we are sure of achieving the pinnacle for success.
      </p>
      <div>
        <img className='left-aligned-image' src={DIRECTOR01} alt='placeholder' />
        <p>
          <b>Here at Watson Academy</b>, we truly understand that the final outcome is always in the 
          hands of student; but, we also believe that it is the teacher who can truly direct the 
          student to achieve the desired goal. I take personal interest in what’s going on in my 
          classes, to confirm that we as an organization achieve the desired outcome.
        </p>
        <p>
          In our view, preparation for examination is based on three pillars – Concept Clarity, 
          Contextual familiarity and Application Expertise. Our innovative and dedicated teaching 
          ensures that every student gets a firm grip of each of these pillars so very essential 
          for arduous preparations.
        </p>
      </div>
      <p>
        I, on behalf of entire Watson Academy team welcome you to join us and feel the blend of 
        quality & Innovation that can change you to be the world class professional.
      </p>
      <div style={{textAlign: 'right'}}>
        <div style={{fontWeight: 'bolder'}}>Dr. Neetu Jangir</div>
        <div style={{margin: '0.5rem 0'}}>(Ph.D in Entomology)</div>
        <div style={{margin: '0.5rem 0'}}>Director & Biology Faculty</div>
      </div>
      </div>
      <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} />
    </div>
  );
};

export default Director;