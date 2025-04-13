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

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const App = () => {
  const [loading, setLoading] = useState({
    isDisplayed: true,
    message: 'loading...',
  });
  const scrollToTop = useRef(null);
  const scrollToPosters = useRef(null);
  const scrollToEvents = useRef(null);
  const scrollToNews = useRef(null);
  const initialState = {
    theme: 'light',
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
    events: [],
    selectedEvent: '',
    headlines: [],
    selectedHeadline: '',
    courses: [],
    posters: {
      isDisplayed: false,
      images: []
    },
    videos: {
      isDisplayed: false,
      clips: []
    },
    photos: {
      isDisplayed: false,
      images: []
    },
    posts: [],
    selectedPost: '',
    enquiries: [],
    classes: [],
    subjects: [],
    timetables: [],
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
      const parsedAppState = appState ? decryptData(appState) : undefined;
      const updatedDB = {
        theme: db.theme,
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
        events: db.events,
        selectedEvent: db.selectedEvent,
        headlines: db.headlines,
        selectedHeadline: db.selectedHeadline,
        courses: db.courses,
        posters: db.posters,
        photos: db.photos,
        videos: db.videos,
        posts: db.posts,
        selectedPost: db.selectedPost,
        enquiries: db.enquiries,
        classes: db.classes,
        subjects: db.subjects,
        timetables: db.timetables,
        banner: db.banner,
        visitors: db.visitors
      };
      dispatch({type: 'FETCH_DATA_SUCCESS', db: updatedDB});
      setLoading({
        isDisplayed: false,
        message: '',
      });
    } catch (error) {
      setLoading({
        isDisplayed: true,
        message: 'unable to contact the server',
      });
    }
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          users: action.db.users,
          pages: action.db.pages.map(item => {
            return { ...item, logo: `${uri}:${port}${item.logo}` };
          }),
          courses: action.db.courses.map(item => {
            return { ...item, logo: `${uri}:${port}${item.logo}` };
          }),
          photos: {
            ...state.photos,
            images: action.db.photos.map(item => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            })
          },
          posters: {
            ...state.posters,
            images: action.db.posters.map(item => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            })
          },
          videos: {
            ...state.videos,
            clips: action.db.videos.map(item => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            })
          },
          events: action.db.events,
          selectedEvent: action.db.selectedEvent,
          headlines: action.db.headlines,
          selectedHeadline: action.db.selectedHeadline,
          posts: action.db.posts,
          selectedPost: action.db.selectedPost,
          enquiries: action.db.enquiries,
          classes: action.db.classes,
          subjects: action.db.subjects,
          timetables: action.db.timetables,
          banner: action.db.banner,
          visitors: action.db.visitors
        };
      case 'CHANGE_THEME':
        return {
          ...state,
          theme: action.theme
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
      case 'ADD_EVENT':
        return {
          ...state,
          events: [action.event, ...state.events],
          banner: {
            isDisplayed: true,
            message: 'Event Added !',
            position: 'center'
          }
        };
      case 'UPDATE_EVENTS':
        return {
          ...state,
          events: action.events,
        };
      case 'DELETE_EVENT':
        return {
          ...state,
          events: state.events.filter(event => event.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Event Deleted !',
            position: 'center'
          }
        };
      case 'CLOSE_EVENT':
        return {
          ...state,
          selectedEvent: ''
        };
      case 'ADD_USER':
        return {
          ...state,
          users: [...state.users, action.user],
          banner: {
            isDisplayed: true,
            message: 'User Added !',
            position: 'center'
          }
        };
      case 'UPDATE_USERS':
        return {
          ...state,
          users: action.users,
        };
      case 'DISPLAY_HEADLINE':
        return {
          ...state,
          selectedHeadline: state.headlines.find(headline => headline.id === action.id)
        };
      case 'ADD_HEADLINE':
        return {
          ...state,
          headlines: [action.headline, ...state.headlines],
          banner: {
            isDisplayed: true,
            message: 'News Added !',
            position: 'center'
          }
        };
      case 'UPDATE_HEADLINES':
        return {
          ...state,
          headlines: action.headlines
        };
      case 'DELETE_HEADLINE':
        return {
          ...state,
          headlines: state.headlines.filter(headline => headline.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'News Deleted !',
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
      case 'UPDATE_POSTERS':
        return {
          ...state,
          posters: {
            ...state.posters,
            images: action.posters.map(item => ({ ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false })),
          }
        };
      case 'DELETE_POSTER':
        return {
          ...state,
          posters: {
            ...state.posters,
            images: state.posters.images.filter(image => image.id !== action.id)
          },
          banner: {
            isDisplayed: true,
            message: 'Poster Deleted !',
            position: 'center'
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
      case 'UPDATE_VIDEO':
        return {
          ...state,
          videos: action.videos
        };
      case 'DELETE_VIDEO':
        return {
          ...state,
          videos: {
            ...state.videos,
            clips: state.videos.clips.filter(clip => clip.id !== action.id)
          },
          banner: {
            isDisplayed: true,
            message: 'Video Deleted !',
            position: 'center'
          }
        };
      case 'ADD_ENQUIRY':
        return {
          ...state,
          enquiries: [action.enquiry, ...state.enquiries],
          banner: {
            isDisplayed: true,
            message: 'Enquiry Sent !',
            position: 'center'
          }
        };
      case 'UPDATE_ENQUIRIES':
        return {
          ...state,
          enquiries: action.enquiries
        };
      case 'DELETE_ENQUIRY':
        return {
          ...state,
          enquiries: state.enquiries.filter(enquiry => enquiry.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Enquiry Deleted !',
            position: 'center'
          }
        };
      case 'RESET_ENQUIRY':
        return {
          ...state,
          enquiries: state.enquiries.map(enquiry => {
            enquiry.status = 'read';
            return enquiry;
          })
        };
      case 'ADD_FEEDBACK':
        return {
          ...state,
          posts: [action.feedback, ...state.posts],
          banner: {
            isDisplayed: true,
            message: 'Feedback Recorded !',
            position: 'center'
          }
        };
      case 'UPDATE_FEEDBACKS':
        return {
          ...state,
          posts: action.posts
        };
      case 'DELETE_FEEDBACK':
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Feedback Deleted !',
            position: 'center'
          }
        };
      case 'UPDATE_TIMETABLE':
        const hours = `${Number(action.timetable.start) > 12 ? (Number(action.timetable.start) - 12) : action.timetable.start}:${action.timetable.startHour} ${Number(action.timetable.start) > 12 ? 'PM' : 'AM'} - ${Number(action.timetable.end) > 12 ? (Number(action.timetable.end) - 12) : action.timetable.end}:${action.timetable.endHour} ${Number(action.timetable.end) > 12 ? 'PM' : 'AM'}`;
        return {
          ...state,
          timetables: state.timetables.map((timetable) => {
            if(timetable.id === action.timetable.id) {
              timetable.standard = action.timetable.standard;
              timetable.hours = hours;
              timetable.start = action.timetable.start;
              timetable.startHour = action.timetable.startHour;
              timetable.end = action.timetable.end;
              timetable.endHour = action.timetable.endHour;
              timetable.subjects = action.timetable.subjects
            };
            return timetable;
          }),
          banner: {
            isDisplayed: true,
            message: 'TimeTable Updated !',
            position: 'center'
          }
        };
      case 'ADD_TIMETABLE':        
        return {
          ...state,
          timetables: [...state.timetables.slice(0, action.index), action.timetable, ...state.timetables.slice(action.index)],
          banner: {
            isDisplayed: true,
            message: 'Timetable Added !',
            position: 'center'
          }
        };
      case 'DELETE_TIMETABLE':
        return {
          ...state,
          timetables: state.timetables.filter(timetable => timetable.id !== action.id),
          banner: {
            isDisplayed: true,
            message: 'Timetable Deleted !',
            position: 'center'
          }
        };
      case 'OPEN_BANNER':
        return {
          ...state,
          banner: {
            isDisplayed: true,
            message: action.message,
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
    return appState ? decryptData(appState) : initial;
  });
  useEffect(() => { 
    fetchData();
    const eventSource = new EventSource(`${uri}:${port}/events`);
    eventSource.onmessage = (event) => {
      const feed = decryptData(event.data);
      dispatch({type: 'UPDATE_USERS', users: feed.users});
      dispatch({type: 'UPDATE_ENQUIRIES', enquiries: feed.enquiries});
      dispatch({type: 'UPDATE_FEEDBACKS', posts: feed.posts});
      dispatch({type: 'UPDATE_HEADLINES', headlines: feed.headlines});
      dispatch({type: 'UPDATE_EVENTS', events: feed.events});
      dispatch({type: 'UPDATE_POSTERS', posters: feed.posters});
      dispatch({type: 'UPDATE_VIDEOS', videos: feed.videos});
    };
    return () => eventSource.close();
  }, []);
  useEffect(() => { sessionStorage.setItem('appState', encryptData(state)) }, [state]);
  const themeStyle = {
    backgroundImage: state.theme === 'cool' ? 'linear-gradient(to right bottom, lightblue, lightyellow)' : 
    state.theme === 'light' ? 'linear-gradient(to right bottom, white, white)' : 'none',
  };
  return (
    <div className='app' style={themeStyle} ref={scrollToTop}>
      {
        loading.isDisplayed ? 
        <div className='page_load' style={themeStyle}>
          <div style={{backgroundImage: loading.message.startsWith('unable') && state.theme === 'cool' ? 'linear-gradient(to right bottom, lightpink, lightyellow)' : 
            loading.message.startsWith('unable') && state.theme === 'light' ? 'linear-gradient(to right bottom, white, whitesmoke)' : 
            loading.message.startsWith('loading') && state.theme === 'cool' ? 'linear-gradient(to right bottom, lightgreen, lightyellow)' :
            loading.message.startsWith('loading') && state.theme === 'light' ? 'linear-gradient(to right bottom, whitesmoke, white)' : 
            'none',
            border: state.theme === 'cool' ? '1px solid lightskyblue' : state.theme === 'light' ? '1px solid lightgrey' : 'none'}}>{loading.message}</div>
        </div> :
        <>
          <Header state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
          { state.signin.user ? <Greet state={state} dispatch={dispatch} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} /> : '' }
          <Main state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} />
          <Footer state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
          { state.banner.isDisplayed ? <Banner state={state} dispatch={dispatch} /> : '' }
          { state.posters.isDisplayed ? <Poster state={state} dispatch={dispatch} scrollToPosters={scrollToPosters} /> : '' }
          { state.signin.isDisplayed ? <SignIn state={state} dispatch={dispatch} scrollToTop={scrollToTop} /> : '' }
        </>
      }
    </div>
  );
};

export default App;
