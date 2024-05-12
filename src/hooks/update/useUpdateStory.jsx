import { setDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore"
import { userUID } from "../../Redux/slice/AuthSlice";
import { useSelector } from "react-redux";
import { fireStoreDb } from "../../../Firebase";
import { toast } from 'react-toastify';
import { useQueryClient } from "react-query";
import { addStoryInQuery, removeStoryFromQuery, updateStoryInQuery } from "../../utils/queryActions";
export default function useUpdateStory() {
    const collectioRef = collection(fireStoreDb, 'stories');
    const queryClient = useQueryClient()
    const user = useSelector(userUID);
    const addStory = async (story) => {
        try {
            const docRef = await addDoc(collectioRef, story);
            await setDoc(doc(collectioRef, docRef.id), { id: docRef.id }, { merge: true });

            const storyWIthID = { ...story, id: docRef.id }

            const storyVisibilityQueryData = queryClient.getQueryData([user, story.visibility])
            if (storyVisibilityQueryData) {
                queryClient.setQueryData([user, story.visibility], addStoryInQuery(storyVisibilityQueryData, storyWIthID))
            }

            const homeStoryQueryData = queryClient.getQueryData('homePageStories');
            if (story.visibility = 'public' && homeStoryQueryData) {
                queryClient.setQueryData('homePageStories', addStoryInQuery(homeStoryQueryData, storyWIthID));
            }
        } catch (error) {
            toast.error(`Error Occurred : ${error.message}`)
        }
    }

    const updateStory = async ({lastVisibility, story}) => {
        await setDoc(doc(collectioRef, story.id), story)
        try {
            const currentVisibilityQueryData = queryClient.getQueryData([user, story.visibility])
            if (lastVisibility != story.visibility) {
                const lastVisibilityQueryData = queryClient.getQueryData([user, lastVisibility]);

                lastVisibilityQueryData && queryClient.setQueryData([user, lastVisibility], removeStoryFromQuery(lastVisibilityQueryData, story.id));

                currentVisibilityQueryData && queryClient.setQueryData([user, story.visibility], addStoryInQuery(currentVisibilityQueryData, story));

                if (lastVisibility === 'public') {
                    const homeStoryQueryData = queryClient.getQueryData('homePageStories')
                    if (lastVisibility = 'public' && homeStoryQueryData) queryClient.setQueryData('homePageStories', removeStoryFromQuery(homeStoryQueryData, story.id));
                }

                if (story.visibility === 'public') {
                    const homeStoryQueryData = queryClient.getQueryData('homePageStories');
                    if (story.visibility = 'public' && homeStoryQueryData) {
                        queryClient.setQueryData('homePageStories', addStoryInQuery(homeStoryQueryData, story));
                    }
                }
            }
            if(lastVisibility === story.visibility){
                queryClient.setQueryData([user,lastVisibility], updateStoryInQuery(currentVisibilityQueryData, story));
                if(story.visibility){
                    const homeStoryQueryData = queryClient.getQueryData('homePageStories');
                    homeStoryQueryData && queryClient.setQueryData('homePageStories', updateStoryInQuery(homeStoryQueryData, story));
                }
            }
        } catch (error) {
            toast.error(`Error Occurred : ${error.message}`)
        }
    }

    const deleteStory = async ({ storyID, visibility }) => {
        try {
            await deleteDoc(doc(collectioRef, storyID));
            queryClient.setQueryData([user, visibility], prevData => removeStoryFromQuery(prevData, storyID));

            const homeStoryQueryData = queryClient.getQueryData('homePageStories')
            if (visibility = 'public' && homeStoryQueryData) queryClient.setQueryData('homePageStories', removeStoryFromQuery(homeStoryQueryData, storyID));
        }
        catch (error) {
            toast.error(`Error Occurred : ${error.message}`);
        }
    }

    return { addStory, updateStory, deleteStory }
}