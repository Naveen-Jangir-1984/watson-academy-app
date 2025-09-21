import CryptoJS from "crypto-js";
import { useEffect, useReducer, useState, lazy, useRef } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";

import usersReducer from "./reducers/usersReducer";
import eventsReducer from "./reducers/eventsReducer";
import headlinesReducer from "./reducers/headlinesReducer";
import postsReducer from "./reducers/postsReducer";
import mediaReducer from "./reducers/mediaReducer";
import enquiriesReducer from "./reducers/enquiriesReducer";
import timetablesReducer from "./reducers/timetablesReducer";

import "./App.css";

const Banner = lazy(() => import("./components/banner/banner"));
const Poster = lazy(() => import("./components/poster/poster"));
const SignIn = lazy(() => import("./components/signin/signin"));
const Greet = lazy(() => import("./components/greet/greet"));

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
    message: "loading...",
  });
  const scrollToTop = useRef(null);
  const scrollToPosters = useRef(null);
  const scrollToVideos = useRef(null);
  const scrollToEvents = useRef(null);
  const scrollToNews = useRef(null);
  const initialState = {
    theme: "cool",
    themes: [],
    signin: {
      isDisplayed: false,
      inputs: {
        username: "",
        password: "",
        error: "",
      },
      user: undefined,
    },
    users: [],
    pages: [],
    events: [],
    selectedEvent: "",
    headlines: [],
    selectedHeadline: "",
    courses: [],
    posters: {
      isDisplayed: false,
      images: [],
    },
    videos: {
      isDisplayed: false,
      clips: [],
    },
    photos: {
      isDisplayed: false,
      images: [],
    },
    posts: [],
    selectedPost: "",
    enquiries: [],
    classes: [],
    subjects: [],
    timetables: [],
    banner: {
      isDisplayed: true,
      message: "",
      position: "",
    },
    visitors: [],
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${uri}:${port}/${resource}/data`);
      const data = await response.text();
      const db = decryptData(data);
      const appState = sessionStorage.getItem("appState");
      const parsedAppState = appState ? decryptData(appState) : undefined;
      const updatedDB = {
        theme: db.theme,
        themes: db.themes,
        signin: parsedAppState
          ? parsedAppState.signin
          : {
              isDisplayed: false,
              inputs: {
                username: "",
                password: "",
                error: "",
              },
              user: undefined,
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
        visitors: db.visitors,
      };
      dispatch({ type: "FETCH_DATA_SUCCESS", db: updatedDB });
      setLoading({
        isDisplayed: false,
        message: "",
      });
    } catch (error) {
      setLoading({
        isDisplayed: true,
        message: "unable to contact the server",
      });
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA_SUCCESS":
        return {
          ...state,
          themes: action.db.themes,
          users: action.db.users,
          pages: action.db.pages.map((item) => {
            return { ...item, logo: `${uri}:${port}${item.logo}` };
          }),
          courses: action.db.courses.map((item) => {
            return { ...item, logo: `${uri}:${port}${item.logo}` };
          }),
          photos: {
            ...state.photos,
            images: action.db.photos.map((item) => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            }),
          },
          posters: {
            ...state.posters,
            images: action.db.posters.map((item) => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            }),
          },
          videos: {
            ...state.videos,
            clips: action.db.videos.map((item) => {
              return { ...item, logo: `${uri}:${port}${item.logo}`, isSelected: false };
            }),
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
          visitors: action.db.visitors,
        };
      case "CHANGE_THEME":
        return {
          ...state,
          theme: state.themes.find((theme) => theme.id === action.theme).id,
        };
      case "SELECT_PAGE":
        return {
          ...state,
          pages: state.pages.map((page) => {
            if (page.id === action.id) {
              return { ...page, isSelected: true };
            } else {
              return { ...page, isSelected: false };
            }
          }),
        };
      case "SELECT_HOME_PAGE_LINK":
        return {
          ...state,
          homePageLinks: state.homePageLinks.map((page, index) => {
            if (index === action.index) {
              return { ...page, isSelected: true };
            } else {
              return { ...page, isSelected: false };
            }
          }),
        };
      case "DESELECT_HOME_PAGE_LINK":
        return {
          ...state,
          homePageLinks: state.homePageLinks.map((page) => {
            return { ...page, isSelected: false };
          }),
        };
      case "SELECT_COURSE":
        return {
          ...state,
          courses: state.courses.map((course, index) => {
            if (index === action.index) {
              return { ...course, isSelected: true };
            } else {
              return { ...course, isSelected: false };
            }
          }),
        };
      case "DESELECT_COURSE":
        return {
          ...state,
          courses: state.courses.map((course) => {
            return { ...course, isSelected: false };
          }),
        };
      case "SELECT_INSTRUCTION":
        return {
          ...state,
          instructions: state.instructions.map((instruction, index) => {
            if (index === action.index) {
              return { ...instruction, isSelected: true };
            } else {
              return { ...instruction, isSelected: false };
            }
          }),
        };
      case "DESELECT_INSTRUCTION":
        return {
          ...state,
          instructions: state.instructions.map((instruction) => {
            return { ...instruction, isSelected: false };
          }),
        };
      case "SELECT_FOOTER_LINK":
        return {
          ...state,
          footerLinks: state.footerLinks.map((link, index) => {
            if (index === action.index) {
              return { ...link, isSelected: true };
            } else {
              return { ...link, isSelected: false };
            }
          }),
        };
      default:
        // Delegate to subReducers
        if (["ADD_USER", "UPDATE_USERS", "DELETE_USER"].includes(action.type)) {
          return usersReducer(state, action);
        }
        if (["DISPLAY_EVENT", "ADD_EVENT", "UPDATE_EVENTS", "DELETE_EVENT", "CLOSE_EVENT"].includes(action.type)) {
          return eventsReducer(state, action);
        }
        if (["DISPLAY_HEADLINE", "ADD_HEADLINE", "UPDATE_HEADLINES", "DELETE_HEADLINE", "CLOSE_HEADLINE"].includes(action.type)) {
          return headlinesReducer(state, action);
        }
        if (["DISPLAY_POST", "CLOSE_POST", "ADD_FEEDBACK", "UPDATE_FEEDBACKS", "DELETE_FEEDBACK"].includes(action.type)) {
          return postsReducer(state, action);
        }
        if (["DISPLAY_POSTER", "UPDATE_POSTERS", "DELETE_POSTER", "CLOSE_POSTER", "UPDATE_VIDEO", "DELETE_VIDEO", "UPDATE_PHOTOS"].includes(action.type)) {
          return mediaReducer(state, action);
        }
        if (["ADD_ENQUIRY", "UPDATE_ENQUIRIES", "DELETE_ENQUIRY", "RESET_ENQUIRY"].includes(action.type)) {
          return enquiriesReducer(state, action);
        }
        if (["UPDATE_TIMETABLE", "ADD_TIMETABLE", "DELETE_TIMETABLE"].includes(action.type)) {
          return timetablesReducer(state, action);
        }
        // For signin and banner, handle here or add more
        if (["OPEN_BANNER", "CLOSE_BANNER", "OPEN_SIGNIN", "CLOSE_SIGNIN", "INPUT_SIGNIN", "SIGNIN", "SIGNOUT"].includes(action.type)) {
          // These were in the original, but since I moved banner to subReducers, but they are shared.
          // For simplicity, handle signin here, but since banner is updated in subReducers, it's ok.
          // But to keep, perhaps add a signinReducer, but for now, since few, handle in main.
          switch (action.type) {
            case "OPEN_BANNER":
              return {
                ...state,
                banner: {
                  isDisplayed: true,
                  message: action.message,
                  position: "center",
                },
              };
            case "CLOSE_BANNER":
              return {
                ...state,
                banner: {
                  isDisplayed: false,
                  message: "",
                  position: "",
                },
              };
            case "OPEN_SIGNIN":
              return {
                ...state,
                signin: {
                  ...state.signin,
                  isDisplayed: true,
                },
              };
            case "CLOSE_SIGNIN":
              return {
                ...state,
                signin: {
                  isDisplayed: false,
                  inputs: {
                    username: "",
                    password: "",
                    error: "",
                  },
                  user: undefined,
                },
              };
            case "INPUT_SIGNIN":
              return {
                ...state,
                signin: {
                  ...state.signin,
                  inputs: {
                    ...state.signin.inputs,
                    [action.attribute]: action.value,
                  },
                },
              };
            case "SIGNIN":
              const user = state.users.find((user) => (user.mobile === action.username || user.email === action.username) && user.password === action.password);
              if (action.attempts > 2) {
                const updatedState = {
                  ...state,
                  signin: {
                    isDisplayed: true,
                    inputs: {
                      username: action.username,
                      password: action.password,
                      error: "Your account is locked !",
                    },
                    user: undefined,
                  },
                };
                return updatedState;
              }
              const updatedState = {
                ...state,
                signin: {
                  isDisplayed: user ? false : true,
                  inputs: {
                    username: user ? "" : action.username,
                    password: user ? "" : action.password,
                    error: user ? "" : "Invalid username or password !",
                  },
                  user: user ? user : undefined,
                },
              };
              return updatedState;
            case "SIGNOUT":
              sessionStorage.removeItem("appState");
              fetchData();
              return {
                ...state,
                signin: {
                  isDisplayed: false,
                  inputs: {
                    username: "",
                    password: "",
                    error: "",
                  },
                  user: undefined,
                },
              };
            default:
              return state;
          }
        }
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const appState = sessionStorage.getItem("appState");
    return appState ? decryptData(appState) : initial;
  });
  useEffect(() => {
    fetchData();
    const eventSource = new EventSource(`${uri}:${port}/events`);
    eventSource.onmessage = (event) => {
      const feed = decryptData(event.data);
      dispatch({ type: "UPDATE_USERS", users: feed.users });
      dispatch({ type: "UPDATE_ENQUIRIES", enquiries: feed.enquiries });
      dispatch({ type: "UPDATE_FEEDBACKS", posts: feed.posts });
      dispatch({ type: "UPDATE_HEADLINES", headlines: feed.headlines });
      dispatch({ type: "UPDATE_EVENTS", events: feed.events });
      dispatch({ type: "UPDATE_POSTERS", posters: feed.posters });
      dispatch({ type: "UPDATE_VIDEOS", videos: feed.videos });
    };
    return () => eventSource.close();
  }, []);
  useEffect(() => {
    sessionStorage.setItem("appState", encryptData(state));
  }, [state]);
  const currentTheme = state.themes.find((theme) => theme.id === state.theme);
  const themeStyle = currentTheme
    ? {
        backgroundImage: currentTheme.backgroundImage,
        border: currentTheme.border,
      }
    : {
        backgroundImage: "linear-gradient(to right bottom, lightblue, lightyellow)",
        border: "1px solid lightskyblue",
      };
  return (
    <div className="app" style={themeStyle} ref={scrollToTop}>
      {loading.isDisplayed ? (
        <div className="page_load" style={themeStyle}>
          <div
            style={{
              backgroundImage: currentTheme ? currentTheme.backgroundImage : "linear-gradient(to right bottom, lightgrey, whitesmoke, white)",
              border: currentTheme ? currentTheme.border : "1px solid lightskyblue",
            }}
          >
            {loading.message}
          </div>
        </div>
      ) : (
        <>
          <Header state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
          {state.signin.user ? <Greet state={state} dispatch={dispatch} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} /> : ""}
          <Main state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} scrollToVideos={scrollToVideos} />
          <Footer state={state} dispatch={dispatch} scrollToTop={scrollToTop} />
          {state.banner.isDisplayed ? <Banner state={state} dispatch={dispatch} /> : ""}
          {state.posters.isDisplayed ? <Poster state={state} dispatch={dispatch} scrollToPosters={scrollToPosters} /> : ""}
          {state.signin.isDisplayed ? <SignIn state={state} dispatch={dispatch} scrollToTop={scrollToTop} /> : ""}
        </>
      )}
    </div>
  );
};

export default App;
