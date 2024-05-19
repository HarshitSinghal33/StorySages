import React from 'react'

// hooks
import { useFetchUserData } from '../../Hooks/Fetches/useFetchUserData';

// Components
import { ShareButton } from '../Common/ShareButton';
import { FollowButton } from './Follow/FollowButton';
import { Button } from '../ui/Button';
import { TbGridDots } from "react-icons/tb";
import { toast } from 'react-toastify';

export function ProfileDetail({ profileData, isCurrentUserProfile, handleSettingOpen, sageID }) {
    const { userData, userDataError } = useFetchUserData({ isPrivate: true });
    const isFollow = userData && (userData.following ? userData.following.includes(sageID) : false)

    if (userDataError) toast.error(`Error Occurred: ${userDataError.message}`)
    return (
        <div className='border-b-2 pb-3 border-slate-600 md:flex md:justify-center w-full'>
            <div className='max-w-[1200px] mt-6 md:flex md:justify-evenly w-full'>
                <div className='flex flex-col md:flex-row'>
                    <img className='ml-2 rounded-full shrink-0 h-[120px] w-[120px]' src={profileData.profile} alt="User profile" />
                    <div className='mx-4'>
                        <h2 className='capitalize font-semibold'>{profileData.name}</h2>
                        <div className='mt-3  font-medium'>
                            <div>Bio:</div>
                            <div>{profileData.description}</div>
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-col m-3 gap-1.5 md:justify-evenly'>
                    {isCurrentUserProfile
                        ? <Button className='font-semibold flex gap-1.5 items-center justify-center' onClick={handleSettingOpen}>
                            <span>Setting</span>
                            <TbGridDots />
                        </Button>
                        : <FollowButton isFollow={isFollow} followingUserData={profileData} />
                    }
                    <ShareButton title={`See my profile ${profileData.name} on storysages`} url={`https://storysages-kh.firebaseapp.com/profile/${profileData.id}`} text={' Follow me on Storysages to experience the magic of words!'} />
                </div>
            </div>
        </div>
    )
}
