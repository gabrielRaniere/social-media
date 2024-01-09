import React from 'react';
import { LiaEdit } from "react-icons/lia";
import { GoComment } from "react-icons/go";
import {FaWindowClose} from 'react-icons/fa';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import './styled.css'
import { get } from 'lodash';
import {useSelector} from 'react-redux';
import { BsSendFill } from "react-icons/bs";
import axios from '../../services/axios';
import {Link} from 'react-router-dom';

export function getTime(createdAt) {
    const created = new Date(createdAt).getTime();
    const now = new Date(Date.now()).getTime();
    const result = new Date(now - created);

    const days = (result.getUTCDate() - 1) > 0 ? (result.getUTCDate() - 1)+ ' days and' : ''

    return (`${days} ${result.getUTCHours()} hours ago`)
}

export default function Post({post}) {

    const [comentDigited, setComent] = React.useState('');
    const [hastags, setHastag] = React.useState([]);
    const [userLiked, setUserLike] = React.useState(false);
    const [likes, setLikes] = React.useState(0);
    const [coments, setComentsArray] = React.useState([]);

    const idUser = useSelector(state => state.authReducer.user.data.id);

    React.useEffect(()=> {
        if(post.hastags) {
            const copyHas = String(post.hastags).split(',');
            setHastag(copyHas);
        }

        console.log('oiioio')

        setLikes(post.Likes.length)
        post.Likes.forEach(like => {
            if(like.use_id === idUser) {
                setUserLike(true);
            }
        })

        setComentsArray(post.Coments)
    }, []);

    function handleDislike() {
       axios.delete('like/'+idUser)
       .then(r => {
            setUserLike(false);
            setLikes(likes - 1)
       }).catch(e => {
            console.log(e);
       });
    }

    function handleLike() {

        if(idUser === post.use_id) return;

       axios.post('like/', {
            target_post: post.id,
            use_id: idUser
       })
       .then(r => {
            setUserLike(true);
            setLikes(likes + 1)
       }).catch(e => {
            console.log(e);
       });
    }

    function handleOpenComents(e) {
        const containerComents = e.currentTarget.parentElement.nextSibling;

        containerComents.classList.add('display-block');
    }

    function handleCloseComents(e) {
        const containerComents = e.currentTarget.parentElement.parentElement;
        containerComents.classList.remove('display-block');
    } 

    function handleMensage(e, postId) {
        console.log(postId, idUser);

        axios.post('coments', {
            message: comentDigited,
            post_id: postId,
            user_id: idUser
        })
        .then(r => {
            console.log(r.data)
            setComentsArray(r.data);
            setComent(' ');
        })
    }

    class FundoImg {
        constructor(urlImg) {
            this.backgroundImage = `url(${urlImg})`;
            this.backgroundSize = `cover`;
            this.backgroundPosition = 'center';
            this.borderRadius = '20px';
        }
    }

    if(!post) return(
        <div>Carregando</div>
    )
    return(
        <div className='post-container'>
            <header>
                <Link to={`/profile/${post.use_id}`} className='link-prof'>
                    <div className='profile'>
                        {
                            get(post, 'User.FotoPerfil.url', false) ? (
                                <img src={post.User.FotoPerfil.url}/>
                            ): (
                                <div className='foto-perfil'>{post.User.nome.slice(0, 2)}</div>
                            )
                        }
                        <div>{post.User.nome}</div>
                    </div>
                </Link>
                <small className='desc-profile'>
                    {getTime(post.createdAt)}
                </small>
                <small className='desc-profile hastag-profile'>
                    {
                        hastags ? (
                            hastags.map(hast => `#${hast.toUpperCase()}  `)
                        )
                        :
                        (
                            'none'
                        )
                    }
                </small>
                <div className='title-post'>
                    {post.title}
                </div>
            </header>

            <div className='edit-post'>
                {idUser === post.use_id ? (
                    <Link to={`/infopost/${post.id}`}>
                        <LiaEdit size={24} className='icon'/>
                    </Link>
                ):(
                    <></>
                )
                }
            </div>
            
            <div className='post-img' style={new FundoImg(post.img)}>
            </div>
            
            <div className='likes'>
                {
                    !userLiked ? (
                        <IoIosHeartEmpty size={25} className='like-icon' onClick={handleLike}/>
                    ):(
                        <IoMdHeart size={25} className='like-icon' color='red' onClick={handleDislike}/>
                    )
                }
                <div className='number-likes'>{likes}</div>
            </div>
            <div className='coments'>
                <GoComment className='icon' size={24} onClick={handleOpenComents}/>
                <div className='quant-coments'>{coments.length}</div>
            </div>
            <div className='container-coments'>
                <div className='form-container'>
                <FaWindowClose className='exit-btn' onClick={handleCloseComents}/>
               {
                coments.map(coment => (
                    <div className='comentario'>
                        <></>
                        <div className='profile profile-coment'>
                        {
                        get(coment, 'User.FotoPerfil.url', false) ? (
                            <img src={coment.User.FotoPerfil.url}/>
                        ): (
                            <div className='foto-perfil perfil-coment'>{coment.User.nome.slice(0, 2)}</div>
                        )
                    }
                            <div>{coment.User.nome}</div>
                        </div>

                        <div className='message'>
                            <p>
                                {coment.message}
                            </p>
                        </div>
                    </div>
                ))
               }

               {idUser === post.use_id ? (
                    <></>
                ):( 
                        <form method='post' className='coment-form'>
                            <input type='text' placeholder='Deixe um comentário' onChange={e => setComent(e.target.value)} value={comentDigited}/>
                            <BsSendFill size={25} color='#5D5FEF' className='icon' onClick={e => handleMensage(e, post.id)}/>
                        </form>
                )
                }
                </div>
            </div>
        </div>
    )
}