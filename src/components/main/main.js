import { useState, useEffect, lazy, Suspense } from "react";
import "./main.css";

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Home = lazy(() => import("../../pages/home/home"));
const Vision = lazy(() => import("../../pages/vision/vision"));
const Watson = lazy(() => import("../../pages/watson/watson"));
const Courses = lazy(() => import("../../pages/courses/courses"));
const Teachers = lazy(() => import("../../pages/teachers/teachers"));
const Admissions = lazy(() => import("../../pages/admissions/admissions"));
const Contact = lazy(() => import("../../pages/contact/contact"));
const Director = lazy(() => import("../../pages/director/director"));
const Sixth = lazy(() => import("../../pages/sixth/sixth"));
const Tenth = lazy(() => import("../../pages/tenth/tenth"));
const Twelfth = lazy(() => import("../../pages/twelfth/twelfth"));
const Meeting = lazy(() => import("../../pages/meeting/meeting"));
const PD = lazy(() => import("../../pages/professional_development/pd"));
const AE = lazy(() => import("../../pages/alternate_education/ae"));
const PI = lazy(() => import("../../pages/parent_instruction/pi"));
const SI = lazy(() => import("../../pages/student_instruction/si"));
const Photos = lazy(() => import("../../pages/photos/photos"));
const ContainerRight = lazy(() => import("../container-right/container-right"));

const useScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const Main = ({ state, dispatch, scrollToTop, scrollToEvents, scrollToNews, scrollToPosters, scrollToVideos }) => {
  const themeStyle = {
    backgroundImage: state.theme === "cool" ? "linear-gradient(to right bottom, lightblue, lightyellow)" : state.theme === "light" ? "linear-gradient(to right bottom, whitesmoke, whitesmoke)" : "none",
    border: state.theme === "cool" ? "1px solid lightskyblue" : state.theme === "light" ? "1px solid whitesmoke" : "none",
  };
  const handleClickPage = (page) => {
    dispatch({ type: "SELECT_PAGE", id: page.id });
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  const { width } = useScreenSize();
  return (
    <div className="main">
      <div className="head" style={{ border: state.theme === "cool" ? "1px solid lightskyblue" : state.theme === "light" ? "1px solid white" : "none" }}>
        <a href="https://www.watsonacademy.in/">
          <img loading="lazy" src={`${uri}:${port}/images/logo-watson.jpg`} alt="placeholder" />
        </a>
        <div className="courses">
          <div>NEET . IIT JEE . KVPY . NTSE . BOARDS</div>
          <div>
            <i>(For Classes 6th - 12th)</i>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="menu-items">
          {state.pages.map(
            (page) =>
              page.id < 8 && (
                <div
                  key={page.id}
                  className="page"
                  style={{
                    backgroundImage: state.theme === "cool" && page.isSelected ? "linear-gradient(to right bottom, lightpink, lightyellow)" : state.theme === "cool" && !page.isSelected ? "linear-gradient(to right bottom, lightblue, lightyellow)" : state.theme === "light" && page.isSelected ? "linear-gradient(to right bottom, #fee, #fee)" : state.theme === "light" && !page.isSelected ? "linear-gradient(to right bottom, whitesmoke, whitesmoke)" : "none",
                    border: state.theme === "cool" ? "1px solid lightskyblue" : state.theme === "light" ? "1px solid whitesmoke" : "none",
                    width: width < 1000 && page.isSelected ? "30%" : width > 1000 ? "13%" : "5%",
                  }}
                  onClick={() => handleClickPage(page)}
                >
                  <img loading="lazy" src={page.logo} alt="placeholder" />
                  <div
                    style={{
                      display: width < 1000 && page.isSelected ? "flex" : width > 1000 ? "flex" : "none",
                    }}
                  >
                    {page.name}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="container">
        <Suspense
          fallback={
            <div className="loading" style={themeStyle}>
              please wait...
            </div>
          }
        >
          <div className="container-left" style={themeStyle}>
            {state.pages.find((page) => page.isSelected).id === 1 && <Home />}
            {state.pages.find((page) => page.isSelected).id === 2 && <Vision />}
            {state.pages.find((page) => page.isSelected).id === 3 && <Watson />}
            {state.pages.find((page) => page.isSelected).id === 4 && <Courses state={state} dispatch={dispatch} />}
            {state.pages.find((page) => page.isSelected).id === 5 && <Teachers />}
            {state.pages.find((page) => page.isSelected).id === 6 && <Admissions />}
            {state.pages.find((page) => page.isSelected).id === 7 && <Contact state={state} dispatch={dispatch} />}
            {state.pages.find((page) => page.isSelected).id === 11 && <Director />}
            {state.pages.find((page) => page.isSelected).id === 12 && <PD />}
            {state.pages.find((page) => page.isSelected).id === 13 && <AE />}
            {state.pages.find((page) => page.isSelected).id === 14 && <PI />}
            {state.pages.find((page) => page.isSelected).id === 15 && <SI />}
            {state.pages.find((page) => page.isSelected).id === 16 && <Photos />}
            {state.pages.find((page) => page.isSelected).id === 21 && <Sixth state={state} dispatch={dispatch} />}
            {state.pages.find((page) => page.isSelected).id === 22 && <Tenth state={state} dispatch={dispatch} />}
            {state.pages.find((page) => page.isSelected).id === 23 && <Twelfth state={state} dispatch={dispatch} />}
            {state.pages.find((page) => page.isSelected).id === 24 && <Meeting />}
          </div>
          <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} scrollToVideos={scrollToVideos} />
        </Suspense>
      </div>
    </div>
  );
};

export default Main;
