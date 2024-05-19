import React from 'react'

// hooks
import { useFetchUserData } from '../../../Hooks/Fetches/useFetchUserData';
import { useUpdatePrivateData } from '../../../Hooks/Updates/useUpdatePrivateData';

// Components
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from '../../ui/Button';
import { toast } from 'react-toastify';

export function LikeButton({ storyID, story }) {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true })

    const { addPrivateData, removePrivateData } = useUpdatePrivateData();

    const handleLike = () => {
        isLiked
            ? removePrivateData({ data: story, type: 'liked' })
            : addPrivateData({ data: story, type: 'liked' })
    }

    const isLiked = userData && (userData.liked ? userData.liked.includes(storyID) : false);

    if (userDataError) toast.error(`Error Occurred: ${userDataError.message}`)
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
