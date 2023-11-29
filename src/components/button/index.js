import React from 'react';
import './style.css'

const Index = ({title, ...props}) => {
  return (
    <button {...props} className='Button'>
      {title}
    </button>
  );
};

export default Index;