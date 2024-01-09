import React, {useState, useEffect} from "react";

import Form from "../../components/form";
import './styled.css'
import {Link} from 'react-router-dom';
import img from './side-img.svg';
import {useDispatch} from 'react-redux';
import { REQUEST_LOGIN } from "../../store/types";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const dispach = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        dispach({type: REQUEST_LOGIN, payload: {email, password}});
    }

    return(
        <div className="main-content">
            <div className="login-content">
                <div className="login-form">
                    <span className="title-login">
                        <i className='bx bx-at'></i>
                        <p>Snapgram</p>
                    </span>

                    <h1>Login in to your account</h1>
                    <small>Welcome back! Please enter your details</small>

                    <Form 
                        handleSubmit={(e)=> handleSubmit(e)}
                        handleEmail={(e) => setEmail(e.target.value)}
                        handlePass={(e) => setPass(e.target.value)}
                    />

                    <small className="no-count" style={{opacity: 0.9}}>
                        Don't have an account ? 
                        <Link to="/register"> Sign up</Link> 
                    </small>
                </div>
                <div className="login-img">
                    <img src={img} alt="side-image"/>
                </div>
            </div>
        </div>
    )
}