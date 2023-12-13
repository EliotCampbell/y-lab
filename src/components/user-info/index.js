import React from 'react';
import './style.css'
import PropTypes from "prop-types";

const UserInfo = ({userdata, t}) => {
  return (
    <>
      <div className='UserInfo'>
        <div className='UserInfo-title'>{t('profile.profile')}</div>
          <div className='UserInfo-info'>{t('profile.name')}<b className='UserInfo-info'> {userdata.profile?.name}</b></div>
          <div className='UserInfo-info'>{t('profile.phoneNumber')}<b className='UserInfo-info'>{userdata.email}</b></div>
          <div className='UserInfo-info'>{'email: '}<b className='UserInfo-info'>{userdata.profile?.phone}</b></div>
      </div>
    </>
  );
};

UserInfo.propTypes = {
  userdata: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
    email: PropTypes.string,
  }),
  t: PropTypes.func
};

UserInfo.defaultProps = {
  t: (text) => text
}

export default UserInfo;