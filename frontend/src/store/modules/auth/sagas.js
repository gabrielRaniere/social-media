import * as types from '../../types';
import {put, call, takeLatest, all} from 'redux-saga/effects';
import axios from '../../../services/axios';
import {toast} from 'react-toastify';
import history from '../../../services/history';
import {isEmail} from 'validator';
import {get} from 'lodash';

function* handleLogin({payload}) {
    try {
        let flag = true;

        if(!isEmail(payload.email)) {
            toast.error('email invalido');
            flag = false;
        }
        if(payload.password.length < 8 || payload.password.length > 15) {
            toast.error('senha deve ter entre 8 a 15 caracteres..')
            flag = false;
        }

        if(!flag) return;

        const response = yield call(axios.post, 'token/', payload);

        toast.success('login efetuado !');
        yield put({type: types.SUCCESS_LOGIN, payload: response.data});

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`

        history.push('/')
    }catch(e) {
        if(typeof e.response.data === 'object') {
            e.response.data.forEach(err => toast.error(err))
        }

        toast.error(e.response.data)

        console.log(e)
        yield put({type: types.SET_LOGOUT})
    }
}

function consumToken({payload}) {
    const token = get(payload, 'authReducer.user.token', '');

    axios.defaults.headers.Authorization = 'Bearer '+ token;
}

export default all([
    takeLatest(types.REQUEST_LOGIN, handleLogin),
    takeLatest('persist/REHYDRATE', consumToken)
])