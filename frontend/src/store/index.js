import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMidleware from 'redux-saga';
import rootSagas from './rootSagas';
import rootReducer from './rootReducer';
import persistorConfig from './persister';
import {persistStore} from 'redux-persist';

const sagaMidleware = createSagaMidleware();


const store = createStore(
    persistorConfig(rootReducer),
    applyMiddleware(sagaMidleware)
    );

sagaMidleware.run(rootSagas);

export default store;

export const persistor = persistStore(store);