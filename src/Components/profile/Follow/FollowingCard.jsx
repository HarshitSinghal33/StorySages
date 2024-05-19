import React from 'react'

//Components
import { Link } from 'react-router-dom'
import { FollowButton } from './FollowButton'

export function FollowingCard({ followingUserData }) {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex justify-between bg-[rgba(19,19,19,0.46)] backdrop-blur-sm rounded-lg shadow-story p-3 h-fit w-[96%] max-w-[750px] mt-6 '>
        <Link to={`/profile/${followingUserData.id}`} className='flex gap-6 items-center w-full'>
          <img src={followingUserData.profile} alt="" className='w-16 h-16 rounded-full' />
          <p className='capitalize'>{followingUserData.name}</p>
        </Link>
        <FollowButton isFollow={true} followingUserData={followingUserData} />
      </div>
    </div>
  )
}