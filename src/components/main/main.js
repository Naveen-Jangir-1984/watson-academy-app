import { lazy, Suspense } from 'react';
import './main.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Home = lazy(() => import('../../pages/home/home'));
const Vision = lazy(() => import('../../pages/vision/vision'));
const Watson = lazy(() => import('../../pages/watson/watson'));
const Courses = lazy(() => import('../../pages/courses/courses'));
const Teachers = lazy(() => import( '../../pages/teachers/teachers'));
const Admissions = lazy(() => import('../../pages/admissions/admissions'));
const Contact = lazy(() => import('../../pages/contact/contact'));
const Director = lazy(() => import('../../pages/director/director'));
const Tenth = lazy(() => import('../../pages/tenth/tenth'));
const Twelfth = lazy(() => import('../../pages/twelfth/twelfth'));
const Meeting = lazy(() => import('../../pages/meeting/meeting'));
const ContainerRight = lazy(() => import('../container-right/container-right'));

const Main = ({ state, dispatch, scrollToTop, scrollToEvents, scrollToNews, scrollToPosters }) => {
  const handleClickPage = (page) => {
    dispatch({type: 'SELECT_PAGE', id: page.id});
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
  return (
    <div className='main'>
      <div className='head'>
        <div className='head-left'>
          <a href='http://www.watsonacademy.in/beta'><img src={`${uri}:${port}/images/logo-watson.jpg`} alt='placeholder' /></a>
          <div className='head-right-top'>
            <div>NEET . IIT JEE . KVPY . NTSE . BOARDS</div>
            <div><i>(Class 6th - 12th)</i></div>
          </div>
        </div>
        <div className='head-right'>
          <div className='head-right-bottom'>
            { state.pages.map((page) => 
              page.id < 8 && <div 
              key={page.id} 
              className='page' 
              style={{backgroundColor: page.isSelected ? '#fcc' : '#eee'}}
              onClick={() => handleClickPage(page)}
            >
              <img src={page.logo} alt='placeholder' />
              <div>{page.name}</div>
            </div>) }
          </div>
        </div>
      </div>
      <div className='container'>
        <Suspense fallback={<div className='loading'>loading...</div>}>
          { state.pages.find(page => page.isSelected).id === 1 && <Home state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 2 && <Vision /> }
          { state.pages.find(page => page.isSelected).id === 3 && <Watson state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 4 && <Courses state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 5 && <Teachers /> }
          { state.pages.find(page => page.isSelected).id === 6 && <Admissions /> }
          { state.pages.find(page => page.isSelected).id === 7 && <Contact state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 11 && <Director /> }
          { state.pages.find(page => page.isSelected).id === 21 && <Tenth /> }
          { state.pages.find(page => page.isSelected).id === 22 && <Twelfth /> }
          { state.pages.find(page => page.isSelected).id === 23 && <Meeting /> }
          <ContainerRight state={state} dispatch={dispatch} scrollToTop={scrollToTop} scrollToEvents={scrollToEvents} scrollToNews={scrollToNews} scrollToPosters={scrollToPosters} />
        </Suspense>
      </div>
    </div>
  );
};

export default Main;