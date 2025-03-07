import { useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import Poster from './components/poster/poster';
import './app.css';

const App = () => {
  const initialState = {
    pages: [
      { name: 'Home', logo: require('./images/home.jpg'), isSelected: true },
      { name: 'Vision & Mission', logo: require('./images/vision.jpg'), isSelected: false },
      { name: 'Why Watson', logo: require('./images/why.jpg'), isSelected: false },
      { name: 'Courses', logo: require('./images/courses.jpg'), isSelected: false },
      { name: 'Teachers', logo: require('./images/teachers.jpg'), isSelected: false },
      { name: 'Admissions', logo: require('./images/admissions.jpg'), isSelected: false },
      { name: 'Contact', logo: require('./images/contact.jpg'), isSelected: false }
    ],
    homePageLinks: [
      { name: 'Professional Developement', logo: require('./images/Home/pd.jpg'), isSelected: false },
      { name: 'Student Instruction', logo: require('./images/Home/si.jpg'), isSelected: false },
      { name: 'Alternate Education', logo: require('./images/Home/ae.jpg'), isSelected: false },
    ],
    footerLinks: [
      { name: 'Director', isSelected: false },
      { name: 'Student Zone', isSelected: false },
      { name: 'Report', isSelected: false },
      { name: 'Parents', isSelected: false },
      { name: 'Image Gallery', isSelected: false }
    ],
    events: [
      { 
        id: 1, 
        title: 'Watson Academy Aspirants', 
        content: 'We are excited to announce that our CRASH COURSE for NEET program will commence on 12th March and will run for 50 days.',  
        bullet1: 'Regular classes (Physics, Chemistry and Biology)',
        bullet2: 'Alternate day mock tests (25 mock tests in total)',
        bullet3: '00-hour revision classes covering the entire syllabus',
        bullet4: '',
        bullet5: '',
        contact: 'This is a crucial period for your NEET preparation, and we urge every student to make the most of it. Our dedicated faculty and team are committed to supporting and guiding you to achieve your goals.',
        date: '27 Februray 2025' 
      },
    ],
    selectedEvent: '',
    headlines: [
      {
        id: 1, 
        title: 'Urgently Hiring for a Typist',
        content: 'Watson Academy, Goa is looking for a skilled typist to join our team. Immediate joiners required.', 
        bullet1: 'Candidate should have Good typing speed and accuracy',
        bullet2: 'Basic Computer knowledge',
        bullet3: 'Attention to details',
        bullet4: 'Prior experience preferred (not mandatory)',
        bullet5: '',
        contact: 'Interested candidates, please contact us ASAP on 9767940053', 
        date: '25 Februray 2025' 
      }
    ],
    selectedHeadline: '',
    courses: [
      { name: 'Basic Courses', logo: require('./images/Courses/basic.jpg'), isSelected: false },
      { name: 'Special Courses', logo: require('./images/Courses/special.jpg'), isSelected: false }
    ],
    posters: [
      { id: 1, name: require('./images/Posters/image01.jpg'), isSelected: false },
      { id: 2, name: require('./images/Posters/image02.jpg'), isSelected: false },
      { id: 3, name: require('./images/Posters/image03.jpg'), isSelected: false },
      { id: 4, name: require('./images/Posters/image04.jpg'), isSelected: false },
      { id: 5, name: require('./images/Posters/image05.jpg'), isSelected: false },
    ],
    displayPoster: {
      isOpen: false,
      images: [],
      element: null,
      scrollToPoster: null
    },
    posts: [
      { 
        id: 1, 
        content: 'Watson provides excellent curriculam and integrated course structure which every student must roll out for.', 
        by: 'Rahul Vaidya (Class X)', 
        date: '5 January 2025' 
      },
      { 
        id: 2, 
        content: 'It has been a please to be part of this academy which focuses on problems students are facing and resolve them upfront.', 
        by: 'Junaid Khan (Class XI)', 
        date: '1 January 2025' 
      },
      { 
        id: 3, 
        content: 'Such a great faculty set up makes the students study effortless by explaining topics in depth.', 
        by: 'Pooja Kale (Class IX)', 
        date: '25 December 2024'
      },
    ],
    selectedPost: '',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_PAGE':
        return {
          ...state,
          pages: state.pages.map((page, index) => {
            if (index === action.index) {
              return { ...page, isSelected: true };
            } else {
              return { ...page, isSelected: false };
            }
          })
      };      
      case 'SELECT_HOME_PAGE_LINK':
        return {
          ...state,
          homePageLinks: state.homePageLinks.map((page, index) => {
            if (index === action.index) {
              return { ...page, isSelected: true };
            } else {
              return { ...page, isSelected: false };
            }
          })
        };      
      case 'DESELECT_HOME_PAGE_LINK':
        return {
          ...state,
          homePageLinks: state.homePageLinks.map((page) => {
              return { ...page, isSelected: false };
          })
        };              
      case 'SELECT_COURSE':
        return {
          ...state,
          courses: state.courses.map((course, index) => {
            if (index === action.index) {
              return { ...course, isSelected: true };
            } else {
              return { ...course, isSelected: false };
            }
          })
        };      
      case 'DESELECT_COURSE':
        return {
          ...state,
          courses: state.courses.map((course) => {
              return { ...course, isSelected: false };
          })
        };      
      case 'SELECT_FOOTER_LINK':
        return {
          ...state,
          footerLinks: state.footerLinks.map((link, index) => {
            if (index === action.index) {
              return { ...link, isSelected: true };
            } else {
              return { ...link, isSelected: false };
            }
          })
        };
      case 'DISPLAY_EVENT':
        return {
          ...state,
          selectedEvent: state.events.find(event => event.id === action.id)
        }
      case 'CLOSE_EVENT':
        return {
          ...state,
          selectedEvent: ''
        }
      case 'DISPLAY_HEADLINE':
        return {
          ...state,
          selectedHeadline: state.headlines.find(headline => headline.id === action.id)
        }
      case 'CLOSE_HEADLINE':
        return {
          ...state,
          selectedHeadline: ''
        }
      case 'DISPLAY_POST':
        return {
          ...state,
          selectedPost: state.posts.find(post => post.id === action.id)
        }
      case 'CLOSE_POST':
        return {
          ...state,
          selectedPost: ''
        }
      case 'DISPLAY_POSTER':
        return {
          ...state,
          displayPoster: {
            isOpen: true,
            images: action.images,
            element: action.element,
            scrollToPoster: null
          }
        }
      case 'CLOSE_POSTER':
        return {
          ...state,
          displayPoster: {
            isOpen: false,
            images: [],
            element: null,
            scrollToPoster: state.displayPoster.element.current.scrollIntoView()
          }
        }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <Header state={state} dispatch={dispatch} />
      <Main state={state} dispatch={dispatch} />
      <Footer state={state} dispatch={dispatch} />
      { state.displayPoster.isOpen ? <Poster state={state} dispatch={dispatch} /> : '' }
    </div>
  );
}

export default App;
