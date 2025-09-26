import { lazy, Suspense, memo } from "react";
import "./courses.css";
const BC = lazy(() => import("../basic_course/bc"));
const SF = lazy(() => import("../silent_features/sf"));
const SC = lazy(() => import("../special_course/sc"));

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Courses = ({ state, dispatch }) => {
  const selectedCourse = state.courses.filter((course) => course.isSelected);
  return (
    <>
      <h2>Our Courses</h2>
      <p>In this competitive age, even 1 mark can make a difference. To score the high marks in exams, you need to know a lot more than what the textbooks provide.</p>
      <p>
        <img loading="lazy" className="left-aligned-image" src={`${uri}:${port}/images/Courses/courses01.jpg`} alt="placeholder" />
        Watson Academy provides the best coaching classes, which helps the students to score good marks and ensure their success in competitive exams.
      </p>
      <h4>Click below buttons to explore more...</h4>
      <div className="container-left-top">
        {state.courses.map((course, i) => (
          <div key={i} className="container-link" style={{ backgroundImage: course.isSelected ? "linear-gradient(to right bottom, lightpink, lightyellow)" : state.themes.find((theme) => theme.id === state.theme).backgroundImage, border: state.themes.find((theme) => theme.id === state.theme).border }} onClick={() => dispatch({ type: "SELECT_COURSE", index: i })}>
            <img loading="lazy" src={course.logo} style={{ width: "20px", height: "20px" }} alt="placeholder" />
            <div>{course.name}</div>
          </div>
        ))}
      </div>
      <div
        className="slider"
        style={{
          backgroundImage: state.themes.find((theme) => theme.id === state.theme).backgroundImage,
          border: state.themes.find((theme) => theme.id === state.theme).border,
          display: selectedCourse.length ? "flex" : "none",
        }}
      >
        <img loading="lazy" className="slider-close" src={`${uri}:${port}/images/close.png`} alt="close" onClick={() => dispatch({ type: "DESELECT_COURSE" })} />
        {selectedCourse.length && selectedCourse[0].name !== undefined && <div className="slider-title">{selectedCourse[0].name}</div>}
        <Suspense fallback={<div className="loading">loading...</div>}>
          {selectedCourse.length && selectedCourse[0].name === "Basic Courses" && <BC />}
          {selectedCourse.length && selectedCourse[0].name === "Silent Features" && <SF />}
          {selectedCourse.length && selectedCourse[0].name === "Special Courses" && <SC />}
        </Suspense>
      </div>
      <h3>Features</h3>
      <ul style={{ lineHeight: "1.5rem" }}>
        <li>Batch of 15 Students</li>
        <li>Weekly Test( 2 test per week)</li>
        <li>Excellent, qualified, child centric team of faculty</li>
        <li>Customised teaching pattern</li>
        <li>Doubt Difficulty & Revision Lectures</li>
      </ul>
    </>
  );
};

export default memo(Courses);
