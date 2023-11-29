import React from 'react';
import './style.css'
import PropTypes from "prop-types";

const Button = ({title, ...props}) => {
  return (
    <button {...props} className='Button'>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  props: PropTypes.object
};

Button.defaultProps = {

}

export default Button;