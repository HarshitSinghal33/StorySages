import { arrayUnion, arrayRemove, updateDoc, doc } from "firebase/firestore"
import { useSelector } from "react-redux"
import { userUID } from "../../Redux/slice/AuthSlice"
import { fireStoreDb } from "../../../Firebase";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addStoryInQuery, removeStoryFromQuery } from "../../utils/queryActions";

export default function useUpdatePrivateData() {
    const user = useSelector(userUID);
    const queryClient = useQueryClient();
    const userPrivateData = queryClient.getQueryData('private');

    const updatePrivateData = async (story, type, isAdd) => {
        const docRef = doc(fireStoreDb, 'users', user, 'private', 'privateData');
        try {
            const updateFunc = isAdd ? arrayUnion : arrayRemove;
            await updateDoc(docRef, { [type]: updateFunc(story.id) });

            const updatedData = {
                ...userPrivateData,
                [type]: isAdd
                    ? [...(userPrivateData[type] || []), story.id]
                    : (userPrivateData[type] || []).filter(id => id !== story.id)
            };

            queryClient.setQueryData('private', updatedData);
            const getTypeQueryData = queryClient.getQueryData(type);
            if(getTypeQueryData){
                queryClient.setQueryData(type, isAdd ? addStoryInQuery(getTypeQueryData, story) : removeStoryFromQuery(getTypeQueryData, story.id))
            }
        } catch (error) {
            toast.error(`Error occurred in ${isAdd ? 'saving' : 'removing'} ${type}: ${error.message}`)
        } 
    }

    const addPrivateData = async ({story, type}) => {
        updatePrivateData(story, type, true);
    }

    const removePrivateData = async ({story, type}) => {
        updatePrivateData(story, type, false);
    }

    return { addPrivateData, removePrivateData }
}    
