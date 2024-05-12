import React, { useState } from 'react'

// Custom Hook
import useUpdatePrivateData from '../../hooks/update/useUpdatePrivateData'

// Components
import Button from '../ui/Button'
import Modal from '../Common/Modal'

export default function FollowButton({ isFollow, followingUserData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { addPrivateData, removePrivateData } = useUpdatePrivateData()
    const handelModalOpen = () => setModalOpen(prev => !prev);

    const handleFollowing = () => {
        isFollow
            ? handelModalOpen()
            : addPrivateData({ story: followingUserData, type: 'following' });
    }

    const setUnFollow = () => {
        removePrivateData({ story: followingUserData, type: 'following' })
        handelModalOpen()
    }
    return (
        <>
            <Button
                variant={isFollow ? 'secondary' : 'primary'}
                buttonText={isFollow ? 'Following' : 'Follow'}
                onClick={handleFollowing}
            />
            <Modal
                open={modalOpen}
                message={`Unfollow ${followingUserData.name}`}
                confirmButtonName={'Unfollow'}
                onCancel={handelModalOpen}
                onConfirm={setUnFollow}
            />
        </>
    )
}