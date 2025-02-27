import { useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import './App.css';

const App = () => {
  const initialState = {
    pages: [
      { name: 'Home', isSelected: true },
      { name: 'Vision & Mission', isSelected: false },
      { name: 'Why Watson', isSelected: false },
      { name: 'Courses', isSelected: false },
      { name: 'Teachers', isSelected: false },
      { name: 'Admissions', isSelected: false },
      { name: 'Contact', isSelected: false }
    ]
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_PAGE':
        return {
          pages: state.pages.map((page, index) => {
            if (index === action.index) {
              return { ...page, isSelected: true };
            } else {
              return { ...page, isSelected: false };
            }
          })
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <Header state={state} dispatch={dispatch} />
      <Main state={state} dispatch={dispatch} />
      <Footer />
    </div>
  );
}

export default App;
