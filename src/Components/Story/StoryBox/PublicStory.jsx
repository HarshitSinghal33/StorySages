import React from 'react'

// Redux
import { useSelector } from 'react-redux';
import { uid } from '../../../Redux/slice/UserAuthSlice';

// Components
import { Link } from 'react-router-dom'
import { SaveButton } from '../StoryButtons/SaveButton';

export function PublicStory({ story }) {
    const userUID = useSelector(uid)
    const { authorID, author, authorProfile, storyID, title, description } = story;
    return (
        <div className='bg-[rgba(19,19,19,0.46)] backdrop-blur-sm rounded-lg shadow-story p-3 h-fit w-full md:w-80 lg:w-[450px]'>
            <Link className='uppercase flex items-center w-full gap-3 font-medium ' to={`/profile/${authorID}`}><img src={authorProfile} alt="" className='w-9 h-9 rounded-full'/> {author}</Link>
            <Link className='my-3' to={`/readstory/${storyID}`} state={story}>
                <div className='text-xl font-bold '>{title}</div>
                <p className='text-lg'>{description}</p>
            </Link>
            {userUID && <SaveButton story={story} />}
        </div>
    )
}