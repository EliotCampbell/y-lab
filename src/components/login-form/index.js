import React, {useState} from 'react';
import './style.css'
import PropTypes from "prop-types";

const LoginForm = ({auth, errorMessage, t}) => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const authHandler = async (event, login, password) => {
    event.preventDefault()
    auth(login, password)
  }

  return (
    <div className='LoginForm'>
      <p className='LoginForm-title'>{t('signIn')}</p>
      <form className='LoginForm-area' onSubmit={(event) => authHandler(event, login, password)}>
        <label>{t('login')}</label>
        <input className='LoginForm-input' value={login} onChange={event => setLogin(event.target.value)}/>
        <label>{t('password')}</label>
        <input className='LoginForm-input' type={'password'} value={password} onChange={(event) => setPassword(event.target.value) }/>
        {errorMessage && <p className='LoginForm-errorText' title={errorMessage}>{errorMessage}</p>}
        <button className='LoginForm-button' type='submit'>{t('doSignIn')}</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  auth: PropTypes.func,
  errorMessage: PropTypes.string,
  t: PropTypes.func
};

LoginForm.defaultProps = {
  auth: () => {},
  t: (text) => text
}

export default LoginForm;