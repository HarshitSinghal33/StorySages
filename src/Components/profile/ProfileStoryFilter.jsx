import React from 'react'

//Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { currentVisibility } from '../../Redux/slice/ProfileVisibilitySlice'
import { setStoriesVisibility } from '../../Redux/slice/ProfileVisibilitySlice';

export function ProfileStoryFilter() {
  const dispatch = useDispatch()
  const folder = useSelector(currentVisibility);
  const handleFolderChange = (e) => {
    dispatch(setStoriesVisibility(e.target.value))
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