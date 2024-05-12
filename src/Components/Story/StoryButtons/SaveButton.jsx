import React from 'react';

// hooks
import useUpdatePrivateData from '../../../hooks/update/useUpdatePrivateData';
import useFetchUserData from '../../../hooks/fetch/useFetchUserData';

// Components
import { toast } from 'react-toastify';
import Button from '../../ui/Button';
import { CiBookmark } from "react-icons/ci";
import { BsBookmarkCheckFill } from "react-icons/bs";

export default function SaveButton({ story }) {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true })
    const { addPrivateData, removePrivateData} = useUpdatePrivateData();
    const isBookMark = userData && userData.saved ? userData.saved.includes(story.id) : false;

    const handleBookMark = () => {
        isBookMark 
        ? removePrivateData({ story: story, type: 'saved' }) 
        : addPrivateData({ story: story, type: 'saved' })
    };

    if(userDataError) toast.error(`Error Occurred: ${userDataError.message}`);
    
    return (
        <Button className='flex items-center gap-1 font-semibold mt-3' isDisabled={isUserDataLoading} onClick={handleBookMark}>
            <span>{isBookMark ? "Saved" : "Save"}:</span>
            <span className='font-semibold text-xl cursor-pointer mt-[2px]' >
                {isBookMark ? <BsBookmarkCheckFill /> : <CiBookmark />}
            </span>
        </Button>
    );
}

