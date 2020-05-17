import React from 'react';
import Profile from '../../components/profile/Profile';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ProfileContainer = ({ history }) => {
  // const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.replace('/login');
  }
  return <Profile user={user} />;
};

export default withRouter(ProfileContainer);
