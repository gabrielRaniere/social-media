import React from 'react';
import './style.css';
import Navegacion from '../../components/nav/index';
import {useSelector} from 'react-redux';
import axios from '../../services/axios';
import {FaEdit} from 'react-icons/fa';
import { BsPostcard } from "react-icons/bs";
import Loading from '../../components/loading';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {IoMdHeart} from 'react-icons/io';

export function getbackgroundColor() {
    const colors = [
        'antiquewhite', 'aqua', 'aquamarine', 'chartreuse',
        'chocolate', 'darkseagreen', 'darkorange', 'crimson'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

export default function Profiler({match}) {

    const [user, setUser] = React.useState({});
    const [load, setLoad] = React.useState(true);
    const [following, setFollowing] = React.useState(0);

    const idUser = useSelector(state => (state.authReducer.user.data.id));

    React.useEffect(() => {
        axios.get(`users/${match.params.visitorId}`)
        .then(r => {
            setUser(r.data);

            axios.get('follow/'+ idUser)
            .then(r => setFollowing(r.data))
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
        .finally(() => setLoad(false))
    }, [])

    React.useEffect(()=> {console.log(`usuário logged: ${idUser}, visitor: ${match.params.visitorId}`)}, []);

    function fundoPost(urlImg) {
        return {
            backgroundImage: `url(${urlImg})`,
            backgroundSize: `cover`,
            backgroundPosition: 'center'
        }
    }

    if(load) return <Loading/>;

    if(!load) return(
        <div className='logged-container'>
            <Navegacion/>
            <div className='prof-container'>
                <header>
                    <div className='img-profile' style={user.FotoPerfil ? {
                        backgroundImage: `url(${user.FotoPerfil.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }: {
                        backgroundColor: 'aqua'
                    }}>
                        {
                            user.FotoPerfil ? (
                                <></>
                            ):(
                                <div>{String(user.nome).slice(0, 2)}</div>
                            )
                        }
                    </div>
                    <div className='info-profile'>
                        <h1>{user.nome}</h1>
                        <span className='desc-prof'>{user.email}</span>
                        <div className='statistics-prof'>
                            <p><span className='numbers-profile'>{user.Posts.length}</span> Posts</p>
                            <p><span className='numbers-profile'>{user.Follows.length}</span> Followers</p>
                            <p><span className='numbers-profile'>{following.length}</span> Following</p>
                        </div>
                    </div>
                </header>

                <div className='my-posts'>
                    <p className='edit-profile post-prof'><span className='icon edit-icon'><BsPostcard/></span> Posts</p>
                    {
                        idUser == match.params.visitorId ? (
                            <Link to='/editProfile'className='link-edit-profile' >
                                <p className='edit-profile'><span className='icon edit-icon'><FaEdit/></span>Edit Profile</p>
                            </Link>
                        ):(
                            <></>
                        )
                    }

                    <div className='my-posts-container'>

                        {
                            user.Posts.map(post => {
                                return (
                                    <Link to={`/infoPost/${post.id}`}>
                                        <div className='personal-post' key={post.id} style={fundoPost(post.img)}>
                                            <div className='post-like'>
                                                <IoMdHeart size={25} className='like-icon' color='red'/>
                                                <div>{post.Likes.length}</div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}