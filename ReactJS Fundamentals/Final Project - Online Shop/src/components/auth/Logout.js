import observer from '../../utils/observer';
import notification from '../../utils/notification';

const logout = () => {
  observer.trigger(observer.events.logoutUser, null);
  localStorage.clear();
  notification.push('success', 'Logout successful!');
};

export default logout;
