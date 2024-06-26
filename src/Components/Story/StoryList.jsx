import React from 'react'

// Components
import { PublicStory } from './StoryBox/PublicStory'
import { OwnerStory } from './StoryBox/OwnerStory'

export function StoryList({ stories, isUser }) {

  return (
    <div className={`flex flex-wrap gap-3 mx-3 my-6 justify-center gap-x-12`}>

      {stories.map(story => isUser
        ? <OwnerStory story={story} key={story.storyID} />
        : <PublicStory story={story} key={story.storyID} />
      )}
    </div>
  )
}