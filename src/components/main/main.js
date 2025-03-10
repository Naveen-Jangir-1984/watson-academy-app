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
const Director = lazy(() => import('../../pages/director/director'));

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
            { state.pages.map((page) => 
            page.id < 8 && <div 
              key={page.id} 
              className='page' 
              style={{backgroundColor: page.isSelected ? '#fcc' : '#eee'}}
              onClick={() => dispatch({type: 'SELECT_PAGE', id: page.id})}
            >
              <img src={page.logo} alt='placeholder' />
              <div>{page.name}</div>
            </div>) }
          </div>
        </div>
      </div>
      <div className='content'>
        <Suspense fallback={<div className='loading'>loading...</div>}>
          { state.pages.find(page => page.isSelected).id === 1 && <Home state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 2 && <Vision state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 3 && <Watson state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 4 && <Courses state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 5 && <Teachers state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 6 && <Admissions state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 7 && <Contact state={state} dispatch={dispatch} /> }
          { state.pages.find(page => page.isSelected).id === 8 && <Director state={state} dispatch={dispatch} /> }
          {/* { state.pages.find(page => page.isSelected).id === 9 && <TimeTable state={state} dispatch={dispatch} /> } */}
        </Suspense>
      </div>
    </div>
  );
};

export default Main;