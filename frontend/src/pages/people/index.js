import React from 'react';
import Navegacion from '../../components/nav';
import './style.css';
import axios from '../../services/axios';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { getbackgroundColor } from '../profile';

export default function People() {

    const [users, setUsers] = React.useState([]);

    const userId = useSelector(state => (state.authReducer.user.data.id))

    React.useEffect(()=> {
        axios.get('users/')
        .then(r => {
            setUsers(r.data);
        })
        .catch(e => console.log(e))
    }, [])

    function handleFollow(e, id) {

        axios.post('follow/', {
            quem_segue: userId,
            seguido: id
        })
        .then(r => {
            axios.get('users/')
            .then(r => {
            setUsers(r.data)
            })
            .catch(e => console.log(e))
            toast.success('deu certo')
        })
        .catch(e => console.log(e));
    }

    function handleUnfollow(e, id) {
        axios.delete('follow/', {
            quem_segue: userId,
            seguido: id 
        })
        .then(r => {
            axios.get('users/')
            .then(r => {
                setUsers(r.data)
            })
            .catch(e => console.log(e))
            toast.success('parou de seguir');
        })
        .catch(e => console.log(e))
    }

    return (
        <div className='logged-container'>
            <Navegacion/>
            <div className='users-container'>
                <h1>All Users</h1>

                <div className='users'>
                {
                    users.map(user => {
                                if(user.id === userId) return;  

                                return(
                                    <div className="user-top">
                                    {
                                            user.FotoPerfil ? (
                                                <img src={user.FotoPerfil.url} alt="foto deperfil"/>
                                            ):(
                                                <div className="img-topUser" style={{backgroundColor: getbackgroundColor()}}>
                                                    {user.nome.slice(0, 2)}
                                                </div>
                                            )
                                    }   

                                    <p>{user.nome}</p>
                                    <small style={{opacity:0.7}}>{user.email}</small>

                                    {user.Follows.length === 0? (
                                        <button type="button" className="btn-follow" onClick={(e) => handleFollow(e, user.id)}>Follow</button> 
                                    ):(
                                        <></> 
                                    )}

                                    {user.Follows.map(follow => {
                                        if(follow.quem_segue === userId) {
                                            return <button type="button" className="btn-unfollow" onClick={(e) => handleUnfollow(e, user.id)}>unFollow</button>                                            
                                        }else {
                                            return <button type="button" className="btn-follow" onClick={(e) => handleFollow(e, user.id)}>Follow</button>        
                                        }
                                    })}
                                   
                                    </div>
                                    
                                )
                    })
                }  
                </div>
            </div>
        </div>
    )
}