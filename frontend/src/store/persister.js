import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
    const persistedReducers = persistReducer({
        storage,
        key: 'snapGram'
    }, reducers)

    return persistedReducers;
}

