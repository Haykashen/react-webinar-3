import StoreModule from '../module';
import { Navigate } from 'react-router-dom';

class Modals extends StoreModule {
  initState() {
    return {
      name: null,
    };
  }

  open(name) {
    this.setState({ name }, `Открытие модалки ${name}`, '/basket');
    return <Navigate to={'basket'}/>
  }

  close() {
    this.setState({ name: null }, `Закрытие модалки`, '/');
  }
}

export default Modals;
