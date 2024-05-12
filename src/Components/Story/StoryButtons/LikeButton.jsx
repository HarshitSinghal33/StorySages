import React from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from '../../ui/Button';
import useFetchUserData from '../../../hooks/fetch/useFetchUserData';
import useUpdatePrivateData from '../../../hooks/update/useUpdatePrivateData';
import { toast } from 'react-toastify';

export default function LikeButton({ storyID, story }) {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true })

    const { addPrivateData, removePrivateData } = useUpdatePrivateData();

    const handleLike = () => {
        isLiked
            ? removePrivateData({ story: story, type: 'liked' })
            : addPrivateData({ story: story, type: 'liked' })
    }

    const isLiked = userData && (userData.liked ? userData.liked.includes(storyID) : false);
    
    if(userDataError) toast.error(`Error Occurred: ${userDataError.message}`)
    return (
        <Button
            variant={'secondary'}
            isLoading={isUserDataLoading}
            onClick={handleLike}
            className='flex justify-center items-center gap-1.5'
            loadingText={'Loading'}
        >
            <span>{isLiked ? 'Unlike' : 'Like'}</span>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
        </Button>
    )
}
