import { lazy, Suspense, memo, useMemo, useCallback } from "react";
import "./main.css";

import { getBaseUrl } from "../../config/api";
import useTheme from "../../hooks/useTheme";
import useScreenSize from "../../hooks/useScreenSize";

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

// Page component mapping for optimized rendering
const PAGE_COMPONENTS = {
  1: Home,
  2: Vision,
  3: Watson,
  4: Courses,
  5: Teachers,
  6: Admissions,
  7: Contact,
  11: Director,
  12: PD,
  13: AE,
  14: PI,
  15: SI,
  16: Photos,
  21: Sixth,
  22: Tenth,
  23: Twelfth,
  24: Meeting,
};

// Pages that require state and dispatch props
const PAGES_WITH_PROPS = [4, 7, 21, 22, 23];

const Main = ({ state, dispatch, scrollToTop, scrollToEvents, scrollToNews, scrollToPosters, scrollToVideos }) => {
  const themeData = useTheme(state);
  const themeStyle = {
    backgroundImage: themeData.backgroundImage,
    border: themeData.border,
  };

  const handleClickPage = useCallback(
    (page) => {
      dispatch({ type: "SELECT_PAGE", id: page.id });
      setTimeout(() => {
        scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    },
    [dispatch, scrollToTop],
  );

  const { width } = useScreenSize();
  const baseUrl = getBaseUrl();

  // Memoize selected page to avoid repeated find operations
  const selectedPage = useMemo(() => state.pages.find((page) => page.isSelected), [state.pages]);
  const selectedPageId = selectedPage?.id;

  // Get the component for the selected page
  const PageComponent = PAGE_COMPONENTS[selectedPageId];
  const needsProps = PAGES_WITH_PROPS.includes(selectedPageId);

  return (
    <div className="main">
      <div className="head" style={themeStyle}>
        <a href="https://www.watsonacademy.in/">
          <img loading="lazy" src={`${baseUrl}/images/watson-logo.png`} alt="placeholder" />
        </a>
        <div className="courses">
          <div>NEET . IIT JEE . KVPY . NTSE . BOARDS</div>
          <div>
            <i>(For Classes 6th to 12th)</i>
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
                    backgroundImage: page.isSelected ? "linear-gradient(to right bottom, lightpink, lightyellow)" : themeData.backgroundImage,
                    border: themeData.border,
                    width: width < 1000 && page.isSelected ? "28%" : width > 1000 ? "13%" : "5%",
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
              ),
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
            {PageComponent && (needsProps ? <PageComponent state={state} dispatch={dispatch} /> : <PageComponent />)}
          </div>
          <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} scrollToVideos={scrollToVideos} />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Main);
