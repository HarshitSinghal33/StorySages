import React, { useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { logOut } from '../../../Redux/slice/AuthSlice'

// Components
import Button from '../../ui/Button'
import Modal from '../../Common/Modal'

export default function LogOut() {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const handleModalOpen = () => setModalOpen(prev => !prev);
    const handleLogOut = () =>{ 
        dispatch(logOut())
        handleModalOpen()
    }
    return (
        <>
            <Button onClick={handleModalOpen} className='w-full max-w-[450px]'>Logout</Button>
            <Modal message={'Do you really want to logout?'} confirmButtonName={'Logout'} onConfirm={handleLogOut} open={modalOpen} onCancel={handleModalOpen}/> 
        </>
    )
}