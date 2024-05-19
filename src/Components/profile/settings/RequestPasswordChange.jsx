import React, { useState, useEffect } from 'react';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Firebase';

//Redux
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '../../../Redux/slice/UserAuthSlice';

// Components
import { toast } from 'react-toastify';
import { Modal } from '../../Common/Modal';
import { IoIosArrowForward } from 'react-icons/io';


export function RequestPasswordChange() {
    const [userEmail, setUserEmail] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()
    const handleModalOpen = () => setModalOpen(prev => !prev);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            user && setUserEmail(user.email)
        })
        return () => unsubscribe()
    }, [])

    const handlePasswordChange = async () => {
        try {
            setModalOpen(false)
            await dispatch(changePasswordAsync({ userEmail })).unwrap()
            toast.success('Email sent successfully.')
        } catch (error) {
            toast.error(`Error occurred in email: ${error.message}`)
        }
    }
    return (
        <>
            <div onClick={handleModalOpen}>
                <span>Change password</span>
                <IoIosArrowForward fontSize={24} />
            </div>
            <Modal message={`Get a email to change Password? on ${userEmail}`} onCancel={handleModalOpen} onConfirm={handlePasswordChange} confirmButtonName={'Send'} open={modalOpen} />
        </>
    )
}