import React from 'react'
import { Link } from 'react-router-dom'

// Components
import { Button } from '../../ui/Button';
import { DeleteButton } from '../StoryButtons/DeleteButton';

export function OwnerStory({ story }) {
    const isLinkNull = story.visibility === 'draft'
    const { title, description, storyID, visibility } = story;
    return (
        <div className='bg-[rgba(19,19,19,0.46)] backdrop-blur-sm rounded-lg shadow-story p-3 w-full md:w-80 lg:w-[450px]'>
            <Link to={isLinkNull ? null : `/readStory/${storyID}`} state={story} className={isLinkNull ? 'cursor-default' : 'cursor-pointer'}>
                <h2>{title}</h2>
                <p>{description ? description : "This story doesn't have description"}</p>
            </Link>

            <div className='flex gap-6 mt-3'>
                <Link to={`/updatestory/${storyID}`} state={story}>
                    <Button>Edit Story</Button>
                </Link>
                <DeleteButton storyID={storyID} visibility={visibility} />
            </div>
        </div>
    )
}
