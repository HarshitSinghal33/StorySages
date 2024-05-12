import { Outlet } from 'react-router-dom';

// Redux
import { userUID } from '../../Redux/slice/AuthSlice';
import { useSelector } from 'react-redux';

// Components
import LoginMessage from './LoginMessage';

export const PrivateRoute =  () => {
    const user = useSelector(userUID)
    return(
        user ? <Outlet/> : <LoginMessage/>
    )
}