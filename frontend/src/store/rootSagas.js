import {all} from 'redux-saga/effects';

//sagas
import authSagas from './modules/auth/sagas';

export default function* rootSagas() {
    return yield all([
        authSagas
    ])
}