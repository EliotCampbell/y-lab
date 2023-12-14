import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";
import {getCookie} from "../../utils";

function Head({title, children, username, userLogoutAction, t}) {

  return (
    <div className='Head'>
      <div className='Head-top'>
        {username
          ?
          <>
            <Link to={'/profile'} className='Head-topUsername'>{username}</Link>
            <div className='Head-topButton'><button onClick={() => userLogoutAction(getCookie('token'))}>{t('head.logout')}</button></div>
          </>
          :
          <Link to={'/login'} className='Head-topButton'><button>{t('head.signIn')}</button></Link>
        }
      </div>
      <div className='Head-main'>
        <div className='Head-place'>
          <h1>{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  username: PropTypes.string,
  userLogoutAction: PropTypes.func,
  t: PropTypes.func
};

Head.defaultProps = {
  userLogoutAction: () => {},
  t: (text) => text
}

export default memo(Head);
