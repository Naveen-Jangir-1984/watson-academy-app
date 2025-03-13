import CryptoJS from 'crypto-js';
import { useEffect, useReducer, useState, lazy, useRef } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';

import './App.css';

const Banner = lazy(() => import('./components/banner/banner'));
const Poster = lazy(() => import('./components/poster/poster'));
const SignIn = lazy(() => import('./components/signin/signin'));
const Greet = lazy(() => import('./components/greet/greet'));

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
const secretKey = process.env.REACT_APP_SECRET_KEY;

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const scrollToTop = useRef(null);
  const scrollToPosters = useRef(null);
  const initialState = {
    signin: {
      isDisplayed: false,
      inputs: {
        username: '',
        password: '',
        error: ''
      },
      user: undefined
    },
    users: [],
    pages: [],
    homePageLinks: [],
    instructions: [],
    events: [],
    selectedEvent: '',
    headlines: [],
    selectedHeadline: '',
    courses: [],
    posters: {
      isDisplayed: false,
      images: []
    },
    posts: [],
    selectedPost: '',
    enquiries: [],
    banner: {
      isDisplayed: true,
      message: '',
      position: ''
    },
    visitors: []
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${uri}:${port}/${resource}/data`);
      const data = await response.text();
      const db = decryptData(data);
      const appState = sessionStorage.getItem('appState');
      const parsedAppState = appState ? JSON.parse(appState) : undefined;
      const updatedDB = {
        signin: parsedAppState ? parsedAppState.signin : {
          isDisplayed: false,
          inputs: {
            username: '',
            password: '',
            error: ''
          },
          user: undefined
        },
        users: db.users,
        pages: db.pages,
        homePageLinks: db.homePageLinks,
        instructions: db.instructions,
        events: db.events,
        selectedEvent: db.selectedEvent,
        headlines: db.headlines,
        selectedHeadline: db.selectedHeadline,
        courses: db.courses,
        posters: db.posters,
        posts: db.posts,
        selectedPost: db.selectedPost,
        enquiries: db.enquiries,
        banner: db.banner,
        visitors: db.visitors
      };
      dispatch({type: 'FETCH_DATA_SUCCESS', db: updatedDB});
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          users: action.db.users,
          pages: action.db.pages.map(item => {
            return { ...item, logo: require(`${item.logo}`) };
          }),
          homePageLinks: action.db.homePageLinks.map(item => {
            return { ...item, logo: require(`${item.logo}`) };
          }),
          instructions: action.db.instructions.map(item => {
            return { ...item, logo: require(`${item.logo}`) };
          }),
          courses: action.db.courses.map(item => {
            return { ...item, logo: require(`${item.logo}`) };
          }),
          posters: {
            ...state.posters,
            images: action.db.posters.images.map(item => {
              return { ...item, logo: require(`${item.logo}`) };
            })
          },
          events: action.db.events,
          selectedEvent: action.db.selectedEvent,
          headlines: action.db.headlines,
          selectedHeadline: action.db.selectedHeadline,
          posts: action.db.posts,
          selectedPost: action.db.selectedPost,
          enquiries: action.db.enquiries,
          banner: action.db.banner,
          visitors: action.db.visitors
        };
      case 'SELECT_PAGE':
        return {
          ...state,
          pages: state.pages.map((page) => {
            if (page.id === action.id) {
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
      case 'SELECT_INSTRUCTION':
        return {
          ...state,
          instructions: state.instructions.map((instruction, index) => {
            if (index === action.index) {
              return { ...instruction, isSelected: true };
            } else {
              return { ...instruction, isSelected: false };
            }
          })
        };
      case 'DESELECT_INSTRUCTION':
        return {
          ...state,
          instructions: state.instructions.map((instruction) => {
              return { ...instruction, isSelected: false };
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
        };
      case 'DELETE_EVENT':
        return {
          ...state,
          events: state.events.filter(event => event.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Thank you !',
            position: 'center'
          }
        };
      case 'CLOSE_EVENT':
        return {
          ...state,
          selectedEvent: ''
        };
      case 'DISPLAY_HEADLINE':
        return {
          ...state,
          selectedHeadline: state.headlines.find(headline => headline.id === action.id)
        };
      case 'DELETE_HEADLINE':
        return {
          ...state,
          headlines: state.headlines.filter(headline => headline.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Thank you !',
            position: 'center'
          }
        };
      case 'CLOSE_HEADLINE':
        return {
          ...state,
          selectedHeadline: ''
        };
      case 'DISPLAY_POST':
        return {
          ...state,
          selectedPost: state.posts.find(post => post.id === action.id)
        };
      case 'CLOSE_POST':
        return {
          ...state,
          selectedPost: ''
        };
      case 'DISPLAY_POSTER':
        return {
          ...state,
          posters: {
            isDisplayed: true,
            images: action.images,
          }
        };
      case 'CLOSE_POSTER':
        return {
          ...state,
          posters: {
            ...state.posters,
            isDisplayed: false,
          }
        };
      case 'ADD_ENQUIRY':
        return {
          ...state,
          enquiries: [action.enquiry, ...state.enquiries],
          banner: {
            isDisplayed: true,
            message: 'Thank you !',
            position: 'center'
          }
        };
      case 'ADD_FEEDBACK':
        return {
          ...state,
          posts: [action.feedback, ...state.posts],
          banner: {
            isDisplayed: true,
            message: 'Thank you !',
            position: 'center'
          }
        };
      case 'DELETE_FEEDBACK':
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Thank you !',
            position: 'center'
          }
        };
      case 'CLOSE_BANNER':
        return {
          ...state,
          banner: {
            isDisplayed: false,
            message: '',
            position: ''
          }          
        };
      case 'OPEN_SIGNIN': 
        return {
          ...state,
          signin: {
            ...state.signin,
            isDisplayed: true
          }
        };
      case 'CLOSE_SIGNIN': 
        return {
          ...state,          
          signin: {
            isDisplayed: false,
            inputs: {
              username: '',
              password: '',
              error: ''
            },
            user: undefined
          }
        };
      case 'INPUT_SIGNIN':
        return {
          ...state,
          signin: {
            ...state.signin,
            inputs: {
              ...state.signin.inputs,
              [action.attribute]: action.value
            }
          }
        };
      case 'SIGNIN':
        const user = state.users.find(user => (user.mobile === action.username || user.email === action.username) && user.password === action.password);
        const updatedState = {
          ...state,
          signin: {
            isDisplayed: user ? false : true,
            inputs: {
              username: user ? '' : action.username,
              password: user ? '' : action.password,
              error: user ? '' : 'Invalid username or password !'
            },
            user: user ? user : undefined
          }          
        }
        return updatedState;
      case 'SIGNOUT':
        sessionStorage.removeItem('appState');
        fetchData();
        return {
          ...state,
          signin: {
            isDisplayed: false,
            inputs: {
              username: '',
              password: '',
              error: ''
            },
            user: undefined
          }
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const appState = sessionStorage.getItem('appState');
    return appState ? JSON.parse(appState) : initial;
  });
  useEffect(() => { fetchData() }, []);
  useEffect(() => { sessionStorage.setItem('appState', JSON.stringify(state)) }, [state]);
  return (
    <div className='app' ref={scrollToTop}>
      {
        loading ? 
        <div className='page_load'>fetching data from server...</div> :
        <>
          <Header state={state} dispatch={dispatch} />
          { state.signin.user ? <Greet state={state} dispatch={dispatch} /> : '' }
          <Main state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToPosters={scrollToPosters} />
          <Footer state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
          { state.banner.isDisplayed ? <Banner state={state} dispatch={dispatch} /> : '' }
          { state.posters.isDisplayed ? <Poster state={state} dispatch={dispatch} scrollToPosters={scrollToPosters} /> : '' }
          { state.signin.isDisplayed ? <SignIn state={state} dispatch={dispatch} scrollToTop={scrollToTop} /> : '' }
        </>
      }
    </div>
  );
}

export default App;
