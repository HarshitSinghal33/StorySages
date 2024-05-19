import { Outlet } from 'react-router-dom';

// Redux
import { uid } from '../../Redux/slice/UserAuthSlice';
import { useSelector } from 'react-redux';

// Components
import { LoginMessage } from './LoginMessage';

export const PrivateRoute = () => {
    const userUID = useSelector(uid)
    return (
        userUID ? <Outlet /> : <LoginMessage />
    )
}