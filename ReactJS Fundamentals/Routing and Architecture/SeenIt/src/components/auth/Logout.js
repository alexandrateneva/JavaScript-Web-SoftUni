import reqHandler from './../../utils/reqHandler';
import observer from '../../utils/observer';

const logout = () => {
  reqHandler.logout().then(res => {
    observer.trigger(observer.events.logoutUser, null);
    localStorage.clear();
    observer.trigger(observer.events.notification, {
      type: 'success',
      message: 'Logout successful!'
    });
  });
};

export default logout;
