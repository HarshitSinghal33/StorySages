import { doc, collection, writeBatch, serverTimestamp } from "firebase/firestore";
import { fireStoreDb } from "../../Firebase";
import { toast } from "react-toastify";
export function useSetInitialData() {
    const setData = async ({ userUID, userName }) => {
        try {
            const userDocRef = doc(fireStoreDb, 'users', userUID);
            const privateDataDocRef = doc(collection(userDocRef, 'private'), 'privateData');
            const userData = {
                joinedOn: serverTimestamp(),
                name: userName,
                description: 'Hey I am now on storySage',
                profile: 'https://img.freepik.com/free-vector/cute-teddy-bear-waving-hand-cartoon-icon-illustration_138676-2714.jpg',
                id: userUID
            }
            const privateData = {
                saved: [],
                following: [],
                liked: []
            };
            const batch = writeBatch(fireStoreDb);
            batch.set(userDocRef, userData);
            batch.set(privateDataDocRef, privateData);
            await batch.commit();
        } catch (error) {
            toast.error(`An unexpected error occurred: ${error.message}, please contact to developer. `)
        }

    }
    return { setData }
}