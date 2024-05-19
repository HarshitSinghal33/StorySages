//firebase
import { arrayUnion, arrayRemove, updateDoc, doc } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase";

// redux
import { useSelector } from "react-redux"
import { uid } from "../../Redux/slice/UserAuthSlice"

// react-query
import { useQueryClient } from "react-query";

// component
import { toast } from "react-toastify";

// utils
import { addDataInQuery, removeDataFromQuery } from "../../utils/queryActions";

export function useUpdatePrivateData() {
    const userUID = useSelector(uid);
    const queryClient = useQueryClient();
    const userPrivateData = queryClient.getQueryData('private');

    const updatePrivateData = async ({data, type, isAdd}) => {
        const docRef = doc(fireStoreDb, 'users', userUID, 'private', 'privateData');
        const dataID = (type === 'following') ? data.id : data.storyID
        try {
            const updateFunc = isAdd ? arrayUnion : arrayRemove;
            await updateDoc(docRef, { [type]: updateFunc(dataID)});

            const updatedData = {
                ...userPrivateData,
                [type]: isAdd
                    ? [...(userPrivateData[type] || []), dataID]
                    : (userPrivateData[type] || []).filter(id => id !== dataID)
            };

            queryClient.setQueryData('private', updatedData);
            const getTypeQueryData = queryClient.getQueryData(type);
            if(getTypeQueryData){
                queryClient.setQueryData(type, isAdd ? addDataInQuery(getTypeQueryData, data) : removeDataFromQuery(getTypeQueryData, dataID))
            }
        } catch (error) {
            toast.error(`Error occurred in ${isAdd ? 'saving' : 'removing'} ${type}: ${error.message}`)
        } 
    }

    const addPrivateData = async ({data, type}) => {
        updatePrivateData({data: data, type: type, isAdd: true});
    }

    const removePrivateData = async ({data, type}) => {
        updatePrivateData({data: data, type: type, isAdd: false});
    }

    return { addPrivateData, removePrivateData }
}    
