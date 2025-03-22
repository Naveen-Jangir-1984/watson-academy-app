import { useState } from 'react';
import './photos.css';

const Photos = ({ state }) => {
  const photos = state.photos.images;
  const extractedNames = [...new Set(photos.map((photo) => photo.name))];
  const [names, setNames] = useState(extractedNames.map(name => {
    return {
      label: name,
      isOpen: false,
    };
  }));
  const handleClickLabel = (label) => {
    setNames(names.map(name => {
      if(name.label === label) {
        name.isOpen = !name.isOpen;
      }
      return name;
    }));
  };
  return (
    <div className='container-left'>
      {
        names.map((name, i) => <div className='layer' key={i}>
          <h2 style={{cursor: 'pointer'}} onClick={() => handleClickLabel(name.label)}>{`${name.isOpen ? '-' : '+'} ${name.label}`}</h2>
          { photos.map((photo, i) => photo.name === name.label && <div key={i} className='photos' style={{display: name.isOpen ? 'flex' : 'none'}}>
            <img className='image' key={i} src={photo.logo} alt={photo.id} />
            </div>
          )}
        </div>)
      }
    </div>
  );
};

export default Photos;