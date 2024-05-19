// firebase
import { setDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase";

// redux
import { uid } from "../../Redux/slice/UserAuthSlice";
import { useDispatch, useSelector } from "react-redux";

// react-query
import { useQueryClient } from "react-query";

// component
import { toast } from 'react-toastify';

// utils
import { addDataInQuery, removeDataFromQuery, updateStoryInQuery } from "../../utils/queryActions";
import { useNavigate } from "react-router-dom";
import { setStoriesVisibility } from "../../Redux/slice/ProfileVisibilitySlice";

export function useUpdateStory() {
    const dispatch = useDispatch()
    const collectioRef = collection(fireStoreDb, 'stories');
    const queryClient = useQueryClient()
    const userUID = useSelector(uid);
    const navigate = useNavigate()
    const addStory = async (story) => {
        try {
            const docRef = await addDoc(collectioRef, story);
            await setDoc(doc(collectioRef, docRef.id), { storyID: docRef.id }, { merge: true });

            const storyWIthID = { ...story, storyID: docRef.id }

            const storyVisibilityQueryData = queryClient.getQueryData([userUID, story.visibility])
            if (storyVisibilityQueryData) {
                queryClient.setQueryData([userUID, story.visibility], addDataInQuery(storyVisibilityQueryData, storyWIthID))
            }

            const homeStoryQueryData = queryClient.getQueryData('homePageStories');

            if (story.visibility === 'public' && homeStoryQueryData) {
                queryClient.setQueryData('homePageStories', addDataInQuery(homeStoryQueryData, storyWIthID));
            }

            navigate('/profile')
            dispatch(setStoriesVisibility(story.visibility))
        } catch (error) {
            toast.error(`Error Occurred : ${error.message}`)
        }
    }

    const updateStory = async ({ lastVisibility, story }) => {
        await setDoc(doc(collectioRef, story.storyID), story)
        try {
            if (lastVisibility !== story.visibility) {
                const lastVisibilityQueryData = queryClient.getQueryData([userUID, lastVisibility]);
                lastVisibilityQueryData && queryClient.setQueryData([userUID, lastVisibility], removeDataFromQuery(lastVisibilityQueryData, story.storyID));

                if (lastVisibility === 'public') {
                    const homeStoryQueryData = queryClient.getQueryData('homePageStories')
                    homeStoryQueryData && queryClient.setQueryData('homePageStories', removeDataFromQuery(homeStoryQueryData, story.storyID));
                }

                queryClient.invalidateQueries([userUID, story.visibility]);
                if (story.visibility === 'public') queryClient.invalidateQueries('homePageStories')
            }

            const currentVisibilityQueryData = queryClient.getQueryData([userUID, story.visibility])

            if (lastVisibility === story.visibility) {
                currentVisibilityQueryData && queryClient.setQueryData([userUID, lastVisibility], updateStoryInQuery(currentVisibilityQueryData, story));
                if (story.visibility === 'public') {
                    const homeStoryQueryData = queryClient.getQueryData('homePageStories');
                    homeStoryQueryData && queryClient.setQueryData('homePageStories', updateStoryInQuery(homeStoryQueryData, story));
                }
            }
            navigate('/profile')
            dispatch(setStoriesVisibility(story.visibility))
        } catch (error) {
            toast.error(`Error Occurred : ${error.message}`)
        }
    }

    const deleteStory = async ({ storyID, visibility }) => {
        try {
            await deleteDoc(doc(collectioRef, storyID));
            queryClient.setQueryData([userUID, visibility], prevData => removeDataFromQuery(prevData, storyID));

            const homeStoryQueryData = queryClient.getQueryData('homePageStories')
            if (visibility = 'public' && homeStoryQueryData) queryClient.setQueryData('homePageStories', removeDataFromQuery(homeStoryQueryData, storyID));
        }
        catch (error) {
            toast.error(`Error Occurred : ${error.message}`);
        }
    }

    return { addStory, updateStory, deleteStory }
}