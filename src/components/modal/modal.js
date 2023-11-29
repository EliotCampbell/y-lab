import React from 'react'
import './style.css'

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

export default Modal
