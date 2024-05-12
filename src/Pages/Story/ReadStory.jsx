import React, { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

// Custom Hooks
import useFetchStory from '../../hooks/fetch/useFetchStory';

// UI Components
import Header from '../../Components/Common/Header';
import Loader from '../../Components/Common/Loader';
import Error from '../../Components/Common/Error';
import { ShareButton } from '../../Components/Common/ShareButton';
import ReactQuill from 'react-quill';
import LikedButton from '../../Components/Story/StoryButtons/LikeButton';
export default function ReadStory() {
  const { storyID } = useParams();
  const { state } = useLocation();

  const { data, error, isLoading } = useFetchStory({ storyID: storyID, isStory: state });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  const story = state || data;

  function renderContent() {
    if (isLoading) return <Loader isCenter={true} />
    if (error) return <Error message={error.message} />
    if (story) return (
      <div className='my-6 max-w-[1020px]'>
        <div className=' flex items-center justify-between sticky max-[375px]:relative -top-0.5 bg-black py-4 z-10'>

          <Link className='ml-3 flex gap-3 items-center' to={`/profile/${story.userUID}`}>
            <img src={story.profile} alt="image" className='w-12 h-12 rounded-full' />
            <span className='text-3xl'>{story.author}</span>
          </Link>
          {story.visibility === 'public' &&
            <div className='flex gap-x-3 mr-1 max-[375px]:flex-col'>
              <LikedButton storyID={storyID} story={story} />
              <ShareButton url={window.location.href} title={story.title} text={story.description}/>
            </div>
          }
        </div>

        <div className='mx-3 text-3xl'>{story.title}</div>

        <ReactQuill theme='bubble' className='readStory' readOnly={true} defaultValue={story.story} />
      </div>
    )
  }

  return (
    <>
      <Header back={true} />
      <div className='flex justify-center w-full'>
      {renderContent()}
      </div>
    </>
  )
}