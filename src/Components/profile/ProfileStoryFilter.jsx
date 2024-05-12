import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { currentFolder } from '../../Redux/slice/CurrentFolderSlice'
import { setStoryFolder } from '../../Redux/slice/CurrentFolderSlice';
export default function UserStoryFilter() {
  const dispatch = useDispatch()
  const folder = useSelector(currentFolder);
  const handleFolderChange = (e) => {
    dispatch(setStoryFolder(e.target.value))
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex justify-between items-center px-6 mt-6 max-w-[1000px] w-full'>
        <span className='capitalize font-semibold text-3xl'>{folder} Stories</span>
        <select name="folderFilter" id="folderFilter" defaultValue={folder} className='p-2 text-black bg-white rounded focus:outline-none' onChange={handleFolderChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="unlisted">Unlisted</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>
  )
}