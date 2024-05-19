import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { serverTimestamp } from 'firebase/firestore';

// Custom Hooks
import { useFetchStory } from '../../Hooks/Fetches/useFetchStory';
import { useUpdateStory } from '../../Hooks/Updates/useUpdateStory';

// Redux
import { uid } from '../../Redux/slice/UserAuthSlice';
import { useSelector } from 'react-redux';

// Components
import { Header } from '../../Components/Common/Header';
import { Loader } from '../../Components/Common/Loader';
import { StoryForm } from '../../Components/Story/Form/StoryForm';
import { Error } from '../../Components/Common/Error';
import { useStoryForm } from '../../Hooks/useStoryForm';
import { useCheckFormChange } from '../../Hooks/useCheckFormChange';

export function UpdateStory() {
  const { state } = useLocation();
  const { storyID } = useParams();
  const navigate = useNavigate()
  const { updateStory } = useUpdateStory();
  const userUID = useSelector(uid)
  const { data, error, isLoading } = useFetchStory({ storyID: storyID, isStory: state })
  const story = state || data;
  const { isFormValuesChange, handleFormChange } = useCheckFormChange({ initialData: story })
  const { storyVisibility, handleStoryVisibility, handleEditorData, register, handleSubmit, watch, setValue, errors } = useStoryForm()

  useEffect(() => {
    if (story) {
      if (userUID !== story.authorID) {
        navigate('/')
      } else {
        setValue('title', story.title)
        setValue('description', story.description)
        handleEditorData(story.story)
        handleStoryVisibility(story.visibility)
      }
    }
  }, [story])

  const seeFormChange = watch()
  useEffect(() => {
    handleFormChange(seeFormChange)
  }, [seeFormChange])

  const submit = async (newData) => {
    const newStory = {
      ...story,
      ...newData,
      lastUpdatedOn: serverTimestamp()
    }
    await updateStory({ lastVisibility: story.visibility, story: newStory })
  }
// console.log(isFormValuesChange);
  function renderCompontent() {
    if (isLoading) return <Loader isCenter={true} />
    if (error) return <Error message={error.message} />
    if (story) return (
      <StoryForm
        isUpdate={true}
        initialEditorData={story.story}
        submit={submit}
        storyVisibility={storyVisibility}
        errors={errors}
        handleStoryVisibility={handleStoryVisibility}
        register={register}
        handleSubmit={handleSubmit}
        handleEditorData={handleEditorData}
        isFormValuesChange={isFormValuesChange}
      />
    )
  }
  return (
    <>
      <Header back={true} />
      {renderCompontent()}
    </>
  )
}
