import { useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import './App.css';

const App = () => {
  const initialState = {
    pages: [
      { name: 'Home', logo: require('./images/Home/home.jpg'), isSelected: true },
      { name: 'Vision & Mission', logo: require('./images/Home/vision.jpg'), isSelected: false },
      { name: 'Why Watson', logo: require('./images/Home/why.jpg'), isSelected: false },
      { name: 'Courses', logo: require('./images/Home/courses.jpg'), isSelected: false },
      { name: 'Teachers', logo: require('./images/Home/teachers.jpg'), isSelected: false },
      { name: 'Admissions', logo: require('./images/Home/admissions.jpg'), isSelected: false },
      { name: 'Contact', logo: require('./images/Home/contact.jpg'), isSelected: false }
    ],
    posts: [
      { title: 'Post 1', content: 'Content 1' },
      { title: 'Post 2', content: 'Content 2' },
      { title: 'Post 3', content: 'Content 3' },
      { title: 'Post 4', content: 'Content 4' },
      { title: 'Post 5', content: 'Content 5' },
      { title: 'Post 6', content: 'Content 6' },
      { title: 'Post 7', content: 'Content 7' },
      { title: 'Post 8', content: 'Content 8' },
      { title: 'Post 9', content: 'Content 9' },
      { title: 'Post 10', content: 'Content 10' }
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
    latestNews: [
      { title: 'News 1', content: 'Content 1', date: '01 Jun 2025' },
      { title: 'News 2', content: 'Content 2', date: '02 Jun 2025' },
      { title: 'News 3', content: 'Content 3', date: '03 Jun 2025' },
      { title: 'News 4', content: 'Content 4', date: '04 Jun 2025' },
      { title: 'News 5', content: 'Content 5', date: '05 Jun 2025' },
      { title: 'News 6', content: 'Content 6', date: '06 Jun 2025' },
      { title: 'News 7', content: 'Content 7', date: '07 Jun 2025' },
      { title: 'News 8', content: 'Content 8', date: '08 Jun 2025' },
      { title: 'News 9', content: 'Content 9', date: '09 Jun 2025' },
      { title: 'News 10', content: 'Content 10', date: '10 Jun 2025' }
    ],
    courses: [
      { name: 'Basic Courses', logo: require('./images/Courses/basic.jpg'), isSelected: false },
      { name: 'Special Courses', logo: require('./images/Courses/special.jpg'), isSelected: false }
    ]
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
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <Header state={state} dispatch={dispatch} />
      <Main state={state} dispatch={dispatch} />
      <Footer state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
