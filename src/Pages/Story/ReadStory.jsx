import React, { useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

// Custom Hooks
import { useFetchStory } from '../../Hooks/Fetches/useFetchStory';
import '../../index.css'

// UI Components
import { Header } from '../../Components/Common/Header';
import { Loader } from '../../Components/Common/Loader';
import { Error } from '../../Components/Common/Error';
import { ShareButton } from '../../Components/Common/ShareButton';
import { LikeButton } from '../../Components/Story/StoryButtons/LikeButton';
import { useSelector } from 'react-redux';
import { uid } from '../../Redux/slice/UserAuthSlice';

// Editor
import Editor from '../../Components/Editor';
import 'quill/dist/quill.bubble.css';

export function ReadStory() {
  const quillRef = useRef()
  const { storyID } = useParams();
  const { state } = useLocation();
  const userUID = useSelector(uid)
  const { data, error, isLoading } = useFetchStory({ storyID: storyID, isStory: state });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  const story = state || data;

  function renderContent() {
    if (isLoading) return <Loader isCenter={true} />
    if (error) return <Error message={error.message} />
    if (story) {
      const { authorID, authorProfile, author, visibility } = story;
      return (
        <div className='mt-6 max-w-[1020px] w-full'>
          <div className=' flex items-center justify-between sticky max-[375px]:relative -top-0.5 bg-black py-3 z-10'>

            <Link className='ml-3 flex gap-3 items-center' to={`/profile/${authorID}`}>
              <img src={authorProfile} alt="image" className='w-12 h-12 rounded-full' />
              <span className='text-3xl'>{author}</span>
            </Link>
            {visibility === 'public' &&
              <div className='flex gap-x-3 mr-1 max-[375px]:flex-col'>
                {userUID && <LikeButton storyID={storyID} story={story} />}
                <ShareButton url={window.location.href} title={story.title} text={story.description} />
              </div>
            }
          </div>

          <div className='mx-3 text-3xl mb-1'>{story.title}</div>

          <Editor className='readstory' ref={quillRef} readOnly={true} defaultValue={story.story} theme='bubble'/>
        </div>
      )
    }
  }

  return (
    <>
      <Header back={true} />
      <div className='flex justify-center w-full'>
        {renderContent()}
      </div>
    </>
  )
}{/* <ReactQuill theme='bubble' className='readStory' readOnly={true} defaultValue={story.story} /> */}