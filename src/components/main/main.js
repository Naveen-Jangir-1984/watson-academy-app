import { lazy, Suspense } from 'react';
import LogoWatson from '../../images/logo-watson.jpg'
import './main.css';

const Home = lazy(() => import('../../pages/home/home'));
const Vision = lazy(() => import('../../pages/vision/vision'));
const Watson = lazy(() => import('../../pages/watson/watson'));
const Courses = lazy(() => import('../../pages/courses/courses'));
const Teachers = lazy(() => import( '../../pages/teachers/teachers'));
const Admissions = lazy(() => import('../../pages/admissions/admissions'));
const Contact = lazy(() => import('../../pages/contact/contact'));

const Main = ({ state, dispatch }) => {
  return (
    <div className='main'>
      <div className='head'>
        <div className='head-left'>
          <img src={LogoWatson} alt='placeholder' />
        </div>
        <div className='head-right'>
          <div className='head-right-top'>
            <div>NEET | IIT JEE | KVPY | NTSE | BOARDS</div>
            <div><i>(Class 6th - 12th)</i></div>
          </div>
          <div className='head-right-bottom'>
            { state.pages.map((page, i) => 
            <div 
              key={i} 
              className='page' 
              style={{backgroundColor: page.isSelected ? '#fcc' : 'white', borderColor: page.isSelected ? '#aaa' : '#e9ecef'}}
              onClick={() => dispatch({type: 'SELECT_PAGE', index: i})}
            >
              <img src={page.logo} alt='placeholder' />
              <div>{page.name}</div>
            </div>) }
          </div>
        </div>
      </div>
      <div className='content'>
        <Suspense fallback={<div className='loading'>Loading...</div>}>
          { state.pages.find(page => page.isSelected).name === 'Home' && <Home state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Vision & Mission' && <Vision state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Why Watson' && <Watson state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Courses' && <Courses state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Teachers' && <Teachers state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Admissions' && <Admissions state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).name === 'Contact' && <Contact state={state} dispatch={dispatch} /> }
        </Suspense>
      </div>
    </div>
  );
};

export default Main;