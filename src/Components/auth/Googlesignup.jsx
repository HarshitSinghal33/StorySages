import React from 'react'

// Redux
import { googleSignupAsync } from '../../Redux/slice/AuthSlice';
import { useDispatch } from 'react-redux';

// Components
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function Googlesignup({formName}) {
    const dispatch = useDispatch()
    const handleGoogleSignIn = async () => {
        try {
            await dispatch(googleSignupAsync()).unwrap()
        } catch (errCode) {
            toast.error(`An unexpected error occurred! ${errCode}. please contact to developer.`)
        }
    }
    return (
        <div onClick={handleGoogleSignIn} className='flex pl-3 justify-center items-center gap-1 h-50 py-3 w-full rounded-lg border hover:border-cyan-600 cursor-pointer relative'>
            <FcGoogle fontSize={24} className='absolute left-3'/>
            <span>{formName} with Google</span>
        </div>
    )
}