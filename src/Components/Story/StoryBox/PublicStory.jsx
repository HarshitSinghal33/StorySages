import React from 'react'
import { Link } from 'react-router-dom'
import SaveButton from '../StoryButtons/SaveButton';

export default function PublicStory({ story }) {
    const { id, title, description } = story;
    return (
        <div className='bg-[rgba(19,19,19,0.46)] backdrop-blur-sm rounded-lg shadow-story p-3 h-fit w-full md:w-80 lg:w-[450px]'>
            <Link className='uppercase flex items-center w-full gap-3 font-medium ' to={`/profile/${story.userUID}`}><img src={story.profile} alt="" className='w-9 h-9 rounded-full'/> {story.author}</Link>
            <Link className='my-3' to={`/readstory/${id}`} state={story}>
                <div className='text-xl font-bold '>{title}</div>
                <p className='text-lg'>{description}</p>
            </Link>
            <SaveButton story={story} />
        </div>
    )
}