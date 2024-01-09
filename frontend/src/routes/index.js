import {Switch} from 'react-router-dom';
import FilterRoute from './filterRoute';

// components

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import People from '../pages/people';
import Profiler from '../pages/profile';
import CreatePost from '../pages/createPost';
import InfoPost from '../pages/postInfo';
import EditProfile from '../pages/editProfile';


export default function Routes() {

    return(
        <Switch>
            <FilterRoute component={EditProfile} path='/editProfile' isClosed/>
            <FilterRoute component={Profiler} path='/profile/:visitorId' isClosed/>
            <FilterRoute component={InfoPost} path='/infoPost/:id' isClosed/>
            <FilterRoute component={CreatePost} path='/post/:id' isClosed/>
            <FilterRoute component={People} path='/people' isClosed/>
            <FilterRoute component={Login} path='/login'/>
            <FilterRoute component={Register} path='/register' />
            <FilterRoute component={Home} path='/' isClosed/>
        </Switch>
    )
}