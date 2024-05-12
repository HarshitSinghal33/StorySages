import { doc, writeBatch, collection, where, query, getDocs } from "firebase/firestore"
import { fireStoreDb } from "../../../Firebase";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { userUID } from "../../Redux/slice/AuthSlice";
import { toast } from "react-toastify";
export default function useUpdateUserData() {
  const user = useSelector(userUID)
  const queryClient = useQueryClient()
  const setUserData = async (data) => {
    const batch = writeBatch(fireStoreDb)
    try {
      const collectionRef = collection(fireStoreDb, 'stories')
      const snapShot = await getDocs(
        query(collectionRef,
          where('userUID', '==', user),
          where('visibility', 'in', ['public', 'unlisted', 'private', 'draft'])
        )
      )

      if (!snapShot.empty) {
        snapShot.docs.forEach(story => {
          batch.update(doc(fireStoreDb, 'stories', story.id), { author: data.name, profile: data.profile })
        })
      }
      batch.update(doc(fireStoreDb, 'users', user), data)

      await batch.commit();
      queryClient.invalidateQueries()
    } catch (error) {
      toast.error(`Error Occurred : ${error.message}`);
    }

  }
  return { setUserData }
}