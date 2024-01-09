import './App.css';
import { Router} from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import store from './store/index';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './store/index';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router  history={history}>
          <Routes />
          <ToastContainer autoClose={1500} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
