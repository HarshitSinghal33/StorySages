import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Custom Hooks
import useFetchStory from '../../hooks/fetch/useFetchStory';
import useUpdateStory from '../../hooks/update/useUpdateStory';

// Redux
import { userUID } from '../../Redux/slice/AuthSlice';
import { useSelector } from 'react-redux';

// Components
import Header from '../../Components/Common/Header';
import Loader from '../../Components/Common/Loader';
import StoryForm from '../../Components/Story/Form/StoryForm';
import Error from '../../Components/Common/Error';

export default function UpdateStory() {
  const { state } = useLocation();
  const { storyID } = useParams();
  const { updateStory } = useUpdateStory();
  const user = useSelector(userUID)
  const { data, error, isLoading } = useFetchStory({storyID: storyID, isStory: state})
  const navigate = useNavigate()
  const story = state || data;

  useEffect(() => {
    (story && user !== story.userUID) && navigate('/')
  }, [story])

  function renderCompontent(){
    if(isLoading) return <Loader isCenter={true}/>
    if(error) return <Error message={error.message}/>
    if(story) return <StoryForm isUpdate={true} initialData={story} submitFunc={updateStory}/>
  }
  return (
    <>
      <Header back={true}/>
      {renderCompontent()}
    </>
  )
}
