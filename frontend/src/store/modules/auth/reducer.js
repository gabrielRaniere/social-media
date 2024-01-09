import * as types from '../../types';

const initState = {
    isLogged: false,
    loading: false,
    user: {}
};

export default function reducer(state=initState, action) {
    const newState = {...state};
    switch(action.type) {
        case types.REQUEST_LOGIN: {
            console.log('fazendo requizição')
            return state;
        }

        case types.SUCCESS_LOGIN : {
            newState.isLogged = true;
            newState.user = {...action.payload}
            console.log(newState);

            return newState
        }

        case types.SET_LOGOUT: {
            return initState;
        }

        default: {
            return state;
        }
    }
}