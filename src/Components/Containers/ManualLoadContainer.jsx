import React from 'react'

// Components
import { FollowingCard } from '../Profile/Follow/FollowingCard'
import { StoryList } from '../Story/StoryList'
import { Button } from '../ui/Button'

export function ManualLoadContainer({ data, isFetchingNextPage, fetchNextPage, hasNextPage, isFollowing }) {
    const allPagesData = data && data.pages.flatMap(page => page.data)

    function handleRenderData() {
        if (allPagesData.length === 0) {
            return <div className='flex justify-center items-center min-h-[81vh]'><h2>{isFollowing ? 'You are not following anyone.' : 'No story Found.'}</h2></div>
        }
        return (
            isFollowing
                ? (
                    <>
                        {allPagesData.map(data => <FollowingCard followingUserData={data} key={data.id} />)}
                    </>
                )
                : <StoryList stories={allPagesData} />
        )
    }

    return (
        <>
            {handleRenderData()}
            {hasNextPage && <div className='flex justify-center mt-3'>
                <Button
                    buttonText={'Load More'}
                    isLoading={isFetchingNextPage}
                    onClick={fetchNextPage}
                />
            </div>}
        </>
    )
}