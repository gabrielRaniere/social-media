import React, {useEffect, useState} from "react";
import './styled.css'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from '../../services/axios';
import { toast } from "react-toastify";
import {get} from 'lodash';
import { GoHome } from "react-icons/go";
import { IoPeopleOutline, IoLogOutOutline  } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import {SET_LOGOUT} from '../../store/types';

export default function Navegacion() {

    const [me, setMe] = useState('');
    const [loading, setLoad] = useState(true);

    const dispach = useDispatch();

    const user = useSelector(state => (state.authReducer.user));

    useEffect(()=> {
        setLoad(true);
        axios.get(`users/${user.data.id}`)
        .then(r => setMe(r.data))
        .catch(e => {
            console.log(e);
            toast.error('algo deu errado com a autenticação..');
        })
        .finally(() => setLoad(false));
    }, [])

    function handleLogOut() {
        dispach({type: SET_LOGOUT})
    }

    if(loading) return (
        <div>CARREGANDO  </div>
    )

    if(me) return( 
        <div className="nav-cont">
            <header>
                <i className='bx bx-at'></i>
                <h1 className="text-nav">Snapgram</h1>
            </header>

                <div className="profile">
                <a href={`/profile/${me.id}`} className='link-prof'>
                {
                    get(me, 'FotoPerfil.url', false) ? 
                        (
                            <img src={me.FotoPerfil.url} alt="foto de perfil"/>
                        ):
                        (
                            <div className="foto-perfil">
                                {String(me.nome).slice(0, 2)}
                            </div>
                        )
                    }

                    <div className="nome-foto-perfil">
                    <p>{me.nome}</p>
                    <p>{me.email}</p>
                    </div>
                </a>
                </div>

            <div className="navegacion">
                <Link to='/'>
                    <GoHome className="icon"/>
                    <div className="text-nav">Home</div>
                </Link>
                {/* <Link>
                    <MdOutlineExplore className="icon"/>
                    <div className="text-nav">Explore</div>
                </Link> */}
                <Link to='/people'>
                    <IoPeopleOutline className="icon"/>
                    <div className="text-nav">People</div>
                </Link>
                <Link to='/post/new'>
                    <AiOutlinePicture className="icon"/>
                    <div className="text-nav">Create Post</div>
                </Link>

                <div className="log-out" onClick={handleLogOut}>
                    <TbLogout2 className="icon"/>
                    <div className="text-nav">Log out</div>
                </div>
            </div>
        </div>
    )
}