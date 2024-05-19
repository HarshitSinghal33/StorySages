import React, { useState } from 'react'

// Custom Hook
import { useUpdatePrivateData } from '../../../Hooks/Updates/useUpdatePrivateData'

// Components
import { Button } from '../../ui/Button'
import { Modal } from '../../Common/Modal'

export function FollowButton({ isFollow, followingUserData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const { addPrivateData, removePrivateData } = useUpdatePrivateData()
    const handelModalOpen = () => setModalOpen(prev => !prev);

    const handleFollowing = () => {
        isFollow
            ? handelModalOpen()
            : addPrivateData({ data: followingUserData, type: 'following' });
    }

    const setUnFollow = () => {
        removePrivateData({ data: followingUserData, type: 'following' })
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