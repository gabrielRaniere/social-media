import React, {useEffect, useState} from 'react';
import './style.css';
import Navegacion from '../../components/nav/index';
import axios from '../../services/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { func } from 'prop-types';

export default function EditProfile() {

    const idUser = useSelector(state => (state.authReducer.user.data.id));
    
    const [perfilUrl, setperfilUrl] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=> {
        axios.get('users/'+idUser)
        .then(r => {
            setperfilUrl(get(r.data, 'FotoPerfil.url', null));
            setNome(r.data.nome);
            setEmail(r.data.email);
        })
    }, []);

     const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('users/'+idUser, {nome, email})
        .then(r => {
            toast.success('editado !');
        })
        .catch(e => {
            console.log(e);
            toast.error('algo deu errado...');
        })
     };

     async function perfilApi(update, data) {
        try{
            if(update) {
                await axios.delete('fotoPerfil/'+idUser);
            }

            const res = await axios['post'](`fotoPerfil/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data;
        }catch(e) {
            console.log(e);
            toast.error('algo deu errado');
        }
     }

     const handleImg = async (e) => {

        const file = e.target.files[0];
        
        const form = new FormData();
        form.append('user_id', idUser);
        form.append('fotoPerfil', file);

        if(perfilUrl) {
            perfilApi(true, form)
        }else{
            perfilApi(false, form);
        }


        const url = URL.createObjectURL(file);
        setperfilUrl(url);
     }  

    return(
        <div className='logged-container'>
            <Navegacion/>
            <div className='edit-container'>
                <h1>Edit profile</h1>

                <form method='post' onSubmit={handleSubmit}>
                    <label htmlFor='input-foto-perfil' className='label-img' style={perfilUrl ? {
                        backgroundImage: `url(${perfilUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }: {}}>
                        {
                            perfilUrl ? (
                                <></>
                            ):(
                                <p>{nome.slice(0, 2)}</p>
                            )
                        }
                    </label>
                    <input type='file' id='input-foto-perfil' onChange={handleImg} style={{display:'none'}}></input>

                    <label htmlFor='input-nome-edit' className='label-text'>Nome</label>
                    <input 
                    type='text'
                    id='input-nome-edit'
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    />

                    <label htmlFor='input-email-edit' className='label-text'>Email</label>
                    <input 
                    id='input-email-edit'
                    type='text'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    />

                    <button type='submit'>Edit</button>
                </form>
            </div>
        </div>
    )
}