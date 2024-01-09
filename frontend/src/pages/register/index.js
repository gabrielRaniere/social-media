import React, {useState} from "react";
import Form from '../../components/form/index';
import './styled.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {isEmail} from 'validator';
import {toast} from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            let flag = true;
            if(!isEmail) {  
                flag = false;
                toast.error('formato de email invalido');
            }
            if(nome.length < 3 || nome.length > 15) {  
                flag = false;
                toast.error('nome deve conter entre 3 a 15 caracteres');
            }
            if(password.length < 3 || password.length > 15) {  
                flag = false;
                toast.error('password deve conter entre 3 a 15 caracteres');
            }
            if(password !== repeat) {  
                flag = false;
                toast.error('as senhas devem ser iguais !');
            }

            if(!flag) return;

            await axios.post('users/', {nome, email, password});
            toast.success('cadastro efetuado !');
            history.push('/login');
        }catch(e) {
            console.log(e);
            if(typeof e.response.data === 'object') {
                e.response.data.errors.map(err => toast.error(err));
            }
            toast.error(e.response.data)
        }

    }

    return(
        <div className="main-content">
            <div className="reg-content">
                <header>
                <i className='bx bx-at'></i>
                <h1>Snapgram</h1>
                </header>

                <h1>Create a new account</h1>
                <small>To use Snapgram, please enter your details</small>

                <Form
                    handleNome={e => setNome(e.target.value)}
                    handleEmail={e => setEmail(e.target.value)}
                    handlePass={e => setPassword(e.target.value)}
                    handleSubmit={e => handleSubmit(e)}
                    handleRepeat={e => setRepeat(e.target.value)}
                />

                <small className="have-acount" style={{opacity: 1}}>
                    Already have an account ? 
                    <Link to='/login'>
                        Log in
                    </Link>
                </small>
            </div>
        </div>
    )
}