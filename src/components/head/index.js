import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, children}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className='Head-content'>
        {children}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
