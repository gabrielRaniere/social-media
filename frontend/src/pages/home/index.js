import React, {useEffect, useState} from "react";

import Navegacion from "../../components/nav";
import './style.css'
import axios from '../../services/axios';
import Post from "../../components/post";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";

export default function Home(){

    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(true);
    const [topUser, setUser] = useState([]);

    const userId = useSelector(state => (state.authReducer.user.data.id))

    useEffect(()=> {
        axios.get('posts/')
        .then(r => {
            setPosts(r.data)
        })
        .catch(e => {
            console.log(e);
            toast.error('algo deu errado');
        })

        axios.get('users/')
        .then(r => {
            setUser(r.data)
            
        })
        .catch(e => console.log(e))
        .finally(() => setLoad(false));
        
    }, []);

    function handleFollow(e, id) {

        axios.post('follow/', {
            quem_segue: userId,
            seguido: id
        })
        .then(r => {
            axios.get('users/')
            .then(r => {
            setUser(r.data)
            })
            .catch(e => console.log(e))
            .finally(() => setLoad(false));
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
                setUser(r.data)
            })
            .catch(e => console.log(e))
            .finally(() => setLoad(false));
            toast.success('parou de seguir');
        })
        .catch(e => console.log(e))
    }

    if(load) return (
        <Loading/>
    )

    return(
        <div className="logged-container">
            <div className="filho-1">
                <Navegacion/>
            </div>
            <div className="filho-2">
                <div className="post-content">
                    <h1>Home Feed</h1>

                    {posts.map(post => <Post post={post} key={post.createdAt}/>)}
                </div>
            </div>
            <div className="filho-3">
                <h1>Top Creators</h1>
                        {
                            topUser.map((user, i) => {

                                if(user.id === userId) return;
                                if(i >= 3 ) return;

                                return(
                                    <div className="user-top">
                                    {
                                            user.FotoPerfil ? (
                                                <img src={user.FotoPerfil.url} alt="foto deperfil"/>
                                            ):(
                                                <div className="img-topUser">
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
    )
} 