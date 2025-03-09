import CryptoJS from "crypto-js";
import { useEffect, useReducer, useState } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import Poster from './components/poster/poster';
import './App.css';
const uri = "https://115.117.107.101";
const port = 27001;
const resource = "/api/watson"
const secretKey = "jangirsFamilyTree";

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const initialState = {
    pages: [],
    homePageLinks: [],
    instructions: [],
    footerLinks: [],
    events: [],
    selectedEvent: '',
    headlines: [],
    selectedHeadline: '',
    courses: [],
    posters: [],
    displayPoster: {
      isOpen: false,
      images: [],
      element: null,
      scrollToPoster: null
    },
    posts: [],
    selectedPost: '',
    enquires: []
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
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
          posters: action.db.posters.map(item => {
            return { ...item, logo: require(`${item.logo}`) };
          }),
          footerLinks: action.db.footerLinks,
          events: action.db.events,
          selectedEvent: action.db.selectedEvent,
          headlines: action.db.headlines,
          selectedHeadline: action.db.selectedHeadline,
          displayPoster: action.db.displayPoster,
          posts: action.db.posts,
          selectedPost: action.db.selectedPost,
          enquires: action.db.enquires
        };
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
          displayPoster: {
            isOpen: true,
            images: action.images,
            element: action.element,
            scrollToPoster: null
          }
        };
      case 'CLOSE_POSTER':
        return {
          ...state,
          displayPoster: {
            isOpen: false,
            images: [],
            element: null,
            scrollToPoster: state.displayPoster.element.current.scrollIntoView()
          }
        };
      case 'UPDATE_ENQUIRY':
        return {
          ...state,
          enquires: [action.enquiry, ...state.enquires]
        };
      case 'UPDATE_FEEDBACK':
        return {
          ...state,
          posts: [action.feedback, ...state.posts]
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${uri}:${port}${resource}/data`);
        const data = await response.text();
        const db = decryptData(data);
        dispatch({type: 'FETCH_DATA_SUCCESS', db: db});
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      {
        loading ? 
        <div className='page_load'>fetching data from server...</div> :
        <>
          <Header state={state} dispatch={dispatch} />
          <Main state={state} dispatch={dispatch} />
          <Footer state={state} dispatch={dispatch} />
          { state.displayPoster.isOpen ? <Poster state={state} dispatch={dispatch} /> : '' }
        </>
      }
    </div>
  );
}

export default App;
