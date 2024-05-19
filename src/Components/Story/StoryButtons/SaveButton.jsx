import React from 'react';

// hooks
import { useUpdatePrivateData } from '../../../Hooks/Updates/useUpdatePrivateData';
import { useFetchUserData } from '../../../Hooks/Fetches/useFetchUserData';

// Components
import { toast } from 'react-toastify';
import { Button } from '../../ui/Button';
import { CiBookmark } from "react-icons/ci";
import { BsBookmarkCheckFill } from "react-icons/bs";

export function SaveButton({ story }) {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true })
    const { addPrivateData, removePrivateData } = useUpdatePrivateData();
    const isBookMark = userData && userData.saved ? userData.saved.includes(story.storyID) : false;

    const handleBookMark = () => {
        isBookMark
            ? removePrivateData({ data: story, type: 'saved' })
            : addPrivateData({ data: story, type: 'saved' })
    };

    if (userDataError) toast.error(`Error Occurred: ${userDataError.message}`);

    return (
        <Button className='flex items-center gap-1 font-semibold mt-3' isDisabled={isUserDataLoading} onClick={handleBookMark}>
            <span>{isBookMark ? "Saved" : "Save"}:</span>
            <span className='font-semibold text-xl cursor-pointer mt-[2px]' >
                {isBookMark ? <BsBookmarkCheckFill /> : <CiBookmark />}
            </span>
        </Button>
    );
}

