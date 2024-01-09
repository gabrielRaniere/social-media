import React from "react";
import {Redirect, Route} from 'react-router-dom';
import PropType from 'prop-types';
import { useSelector } from "react-redux";

export default function FilterRoute({component, isClosed, ...rest}) {
    const isLogged = useSelector(state => (state.authReducer.isLogged))

    if(isClosed && !isLogged) return <Redirect to='/login'/>

    return <Route component={component} {...rest}/>
}

FilterRoute.defaultProps = {
    isClosed: false
};


FilterRoute.propTypes = {
    component: PropType.oneOfType([PropType.elementType], [PropType.func]).isRequired,
    isClosed: PropType.bool
};

