import './home.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Home = ({ state, dispatch }) => {
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke)' : 'none',
    border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid whitesmoke' : 'none',
  };
  return (
    <div className='container-left' style={themeStyle}>
      <h2>Welcome to Watson Academy</h2>
      <p>
        What makes the Watson Academy the smartest choice? Goa's (Vasco-da-Gama) first (NEET or IIT JEE) 
        coaching center that provides 6 Days Regualar Classes, 4 Days Regular DPP for Each Subject 
        (Physics, Chemistry, Maths and Biology). Class 6th to 12th, Board/School and Olympiad preparation, 
        Parent Teacher Meetings, Motivational Sessions.
      </p>
      <div>
        <p>
          If you are dreaming to be future doctor and engineer. You want to score well in your exams. 
          We are here to help you. You will get well deigned study materials. We have well qualified 
          teachers (IITIAN, BITSIAN and PHD Scholar).
        </p>
        <p>
          Best Coaching Institute for Pre-Medical (AIPMT, NEET & AIIMS), IITJEE, JEE containers, 
          JEE Advanced, NTSE, KVPY, Boards, Commerce Maths and Class - VIII to XII Science & Maths.
        </p>
        <h2>Individual approach to Education!</h2>
        <p>
          <img className='home-left-aligned-image' src={`${uri}:${port}/images/Home/home01.jpg`} alt='placeholder' />
          <b>
            Watson Academy was started 7 years ago only with 2 students but today we are providing coaching for more 
            than 80 students under one roof. Watson is a complete science academy i.e. PCMB (Maths & Biology).
          </b>
        </p>
        <p>
          In the field of education we have different thinking. Besides providing Basic and Standardized knowledge of 
          each subject our container motive is to raise the mental moral standard of students so that our country would get 
          educated & civilized generation.
        </p>
        <p>
          We, as a unit, has designed a system which will develop interest for science 
          in students and their preparations will be guided by means of various assignments and activities.
          Our aim is to cater children’s academic needs based on their academic capabilities, grasping power, level 
          of dedications and level of performance achievement. With this, the institute is on its “Path to Success” 
          by writing its success story and adding more episode of splendid achievement year after year.
        </p>
        <p>
          <i>“Dream is not that which you see while sleeping, it is something that does not let you sleep.”</i>
        </p>
        <p style={{textAlign: 'right'}}><i> - <b>A P J Abdul Kalam</b></i></p>
      </div>
    </div>
  );
};

export default Home;