import './vision.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Vision = () => {
  return (
    <>
      <h2>Our Vision</h2>
      <p>
        To become a premier academy of education recognized for its diversity, and known for excellence in teaching, 
        learning and students - Watson future proofing Academy. Our nation needs to harness the intellectual potential 
        of our younger generation to turn India into a superpower.
      </p>
      <div>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Vision/vision01.jpg`} alt='placeholder' />
        <p>
          Watson Academy is a premier coaching institute that nurtures the students to explore their full potential 
          so as to boost their self-confidence and moral in order to realize their dreams by advanced teaching methodology.
        </p>
        <p>
          Our vision is to impact best quality education from 8th standard onwards for national and global examinations 
          and help them to fulfill their dreams of entering in to the top Engineering and Medical collages daily version 
          classroom study.
        </p>
      </div>
      <h2>Our Mission</h2>
      <p>
        To deliver quality education to each and every student and to ensure his or her success. 
        We commit ourselves to excellent education and boast of a number of faculty members who are totally devoted 
        and committed so as to build trust and compassion between teachers and students and ensure that the students 
        achieve what they came for.
      </p>
      <div>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Vision/vision02.jpg`} alt='placeholder' />
        <p>
          We are committed to provide a safe and intellectually challenging environment that will empower students to 
          become innovative thinkers, creative problem solvers and inspired learners prepared to thrive in the twenty-first 
          century. We are dedicated to provide a comprehensive, challenging and engaging curriculum that will be responsive 
          to the needs of each student.
        </p>
        <p>
          Watson Academic Coaching helps the students to develop effective academic skills, gain confidence, increase motivation, 
          and earn better grades. Watson offeress individual sessions with a peer coach and through group workshops. We help 
          students to understand their learning styles, improve their study skills, and develop effective time management 
          strategies.
        </p>
      </div>
    </>
  );
};

export default Vision;