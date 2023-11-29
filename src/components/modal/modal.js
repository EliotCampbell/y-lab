import React from 'react'
import './style.css'
import PropTypes from "prop-types";

const Modal = ({ children, setVisible }) => {

  return (
    <div className='modal' onClick={() => setVisible(false)}>
      <div
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  setVisible: PropTypes.func
}

export default Modal
