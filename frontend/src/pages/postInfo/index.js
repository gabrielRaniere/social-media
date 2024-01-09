import React from "react";
import './style.css'
import {useSelector} from 'react-redux';
import axios from "../../services/axios";
import history from '../../services/history';
import { toast } from "react-toastify";
import Navegacion from '../../components/nav/index';
import {get} from 'lodash';
import { getTime } from "../../components/post";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { GoComment } from "react-icons/go";
import { FaWindowClose } from "react-icons/fa";

export default function InfoPost({match}) {
    const [post, setPost] = React.useState({});
    const [load, setLoad] = React.useState(true);
    const [hastags, setHas] = React.useState([]);

    const userCount = useSelector(state => (state.authReducer.user.data.id));

    const idPost = match.params.id;

    React.useEffect(() => {
        axios.get(`posts/${idPost}`)
        .then(r => {
            setPost(r.data);
            return r.data
        })
        .then((response)=> {
            if(userCount !== response.use_id) {
                toast.error('post it"s not yours');
                history.goBack();
            }

            const copyHas = String(post.hastags).split(',');
            setHas(copyHas);
        })
        .catch(e => {
            console.log(e)
            history.goBack();
            toast.error('post não encontrado...')
        })
        .finally(()=> setLoad(false));
        

        

    }, []);

    function fundoPost(urlImg) {
        return {
            backgroundImage: `url(${urlImg})`,
            backgroundSize: `cover`,
            backgroundPosition: 'center'
        }
    }

    function handleDelete() {
        axios.delete('posts/'+post.id)
        .then(r => {
            history.push('/profile');
            toast.success('post apagado com sucesso...');
        })
        .catch(e => {
            console.log(e);
            toast.error('something went wrong...');
        })
    }

    function handleOpenComents(e) {
        const coments = (e.currentTarget.nextSibling);

        coments.classList.add('display-flex');
    }

    function handleCloseComents(e) {
        (e.currentTarget.parentElement.parentElement
            .classList.remove('display-flex'));
    }

    if(!load) return(
        <div className="info-post-cont">
            <Navegacion/>
            <div className="info-post-content">
                <div className="personal-post" style={fundoPost(post.img)}></div>
                <div className="info-post-details">
                    <header>
                    <div>
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
                        <small className='desc-profile'>
                        {getTime(post.createdAt)}
                        </small>
                        <small className='desc-profile tags'>
                            {hastags.map(tag => `#${tag} `)}
                        </small>
                    </div>
                    <div className="icons-post-detail">
                        <Link to={`/post/${idPost}`}>
                            <FiEdit size={20} color={`var(--primary-purple)`}/>
                        </Link>
                        <Link>
                            <MdDeleteOutline 
                            size={25} 
                            color="rgb(234, 73, 73)" 
                            onClick={handleDelete}/>
                        </Link>

                    </div>
                    </header>
                    <div className="title-info-post">
                        <p>{post.title}</p>
                    </div>
                    <GoComment 
                    className="icon-coment" 
                    color={`var(--primary-purple)`} 
                    size={20}
                    onClick={handleOpenComents}
                    />


                    <div className='container-coments'>
                                <div className='form-container'>
                            <FaWindowClose className='exit-btn' onClick={handleCloseComents}/>
                        {
                            post.Coments.map(coment => (
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

                                    <div className='message'>{coment.message}</div>
                                </div>
                            ))
                        }
                </div>
            </div>
                </div>
            </div>
        </div>
    )
}