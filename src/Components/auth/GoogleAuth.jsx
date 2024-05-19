import React from 'react'

// Redux
import { googleSignupAsync, isGoogleAuthLoading } from '../../Redux/slice/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { Button } from '../ui/Button'

export function GoogleAuth({ formName }) {
    const dispatch = useDispatch();
    const isGoogleLoad = useSelector(isGoogleAuthLoading)
    const handleGoogleSignIn = async () => {
        try {
            await dispatch(googleSignupAsync()).unwrap()
        } catch (errCode) {
            toast.error(`An unexpected error occurred! ${errCode}. please contact to developer.`)
        }
    }
    return (
        <Button onClick={handleGoogleSignIn} isLoading={isGoogleLoad} variant={'none'} className='flex pl-3 justify-center items-center gap-1 h-50 py-3 w-full rounded-lg border hover:border-cyan-600 cursor-pointer relative'>
            <FcGoogle fontSize={24} className='absolute left-3' />
            <span>{formName} with Google</span>
        </Button>
    )
}