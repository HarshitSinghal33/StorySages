import React, { useState } from 'react'

//hooks
import { useUpdateStory } from '../../../Hooks/Updates/useUpdateStory';

// Components
import { Modal } from '../../Common/Modal';
import { Button } from '../../ui/Button';

export function DeleteButton({ storyID, visibility }) {
    const { deleteStory } = useUpdateStory();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = () => setIsModalOpen(prev => !prev)

    const handleStorydelete = () => {
        setIsModalOpen(false)
        deleteStory({ storyID: storyID, visibility: visibility })
    }

    return (
        <>
            <Button variant={'danger'} onClick={handleModalOpen}>Delete</Button>
            <Modal message={'Do you really want to delete story?'} confirmButtonName={'delete'} open={isModalOpen} onConfirm={handleStorydelete} onCancel={handleModalOpen} />
        </>
    )
}
