import React, {useState} from "react";
import Navegacion from '../../components/nav/index';
import './style.css'
import { SlPicture } from "react-icons/sl";
import { ImFilePicture } from "react-icons/im";
import axios from "../../services/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import history from '../../services/history';
import Loading from '../../components/loading/index';

export default function CreatePost({match}) {

    const [post, setPost] = useState(undefined);
    const [load, setLoad] = useState(true);
    const [file, setFile] = useState('');
    const [img, setImg] =  useState('');
    const [title, setTitle] = useState('');
    const [hastags, setTags] = useState('');

    const use_id = useSelector(state => (state.authReducer.user.data.id))

    React.useEffect(()=>{
        console.log(match)

        if(match.params.id !== 'new')  {
            axios.get('posts/'+match.params.id)
            .then(r => {
                setPost(r.data);
                setTitle(r.data.title);
                setTags(r.data.hastags);
                setImg(r.data.img)
                setLoad(false);
            })
            .catch(e => console.log(e))
        }else {
            setLoad(false);
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        if(match.params.id !== 'new') {
            axios.put('posts/'+post.id, {
                title,
                hastags
            })
            .then(r => {
                toast.success('your post has been edited')
            })
            .catch(e => console.log(e))
        }else {
                const form =  new FormData();

            form.append('title', title);
            form.append('hastags', hastags);
            form.append('use_id', use_id);
            form.append('post', file);

            axios.post('posts/', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(r => {
                toast.success('your post has been launched')
                history.push('/profile');
            })
            .catch(e => console.log(e))
        }
    }

    function handleChange(e) {

        if(match.params.id !== 'new') return;

        const file = (e.currentTarget.files);

        setFile(file[0]);

        const urlInput = URL.createObjectURL(file[0]);
        setImg(urlInput);
    }

    function handleCancel() {
        setImg('');
        setTags('');
        setTitle('');
    }

    if(load) return (
        <div className="create-container">
            <Navegacion/>
            <Loading/>
        </div>
    )

    return(
        <div className="create-container">
            <Navegacion/>
            <div className="create-content">
                <header>
                    <SlPicture size={34}/>
                    <h1>Create Post</h1>
                </header>

                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="title-input">Title</label>
                    <input 
                    type="text" 
                    id="title-input"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    />

                    <label htmlFor="hastag-input">Hastags</label>
                    <input 
                    type="text" 
                    id="hastag-input" 
                    placeholder="something,another"
                    onChange={e => setTags(e.target.value)}
                    value={hastags}
                    />

                    <label htmlFor="img-post" id="label-img" style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${img ? img: 'none'})`
                    }}>
                        {
                            img ? (<>
                            </>)
                            :
                            (<>
                                <ImFilePicture className="label-i-post"/>
                                <p>Drag Your Foto Here</p>
                                <small>PNG, JPG</small>
                            </>)
                            
                        }
                    </label>
                    <input 
                    type="file" 
                    id="img-post"  
                    onChange={handleChange}
                    />

                    <div className="btns-container">
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}