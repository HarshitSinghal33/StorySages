import React, { useEffect } from 'react';

// Custom Hooks
import { useScrollEnd } from '../../hooks/useScrollEnd';

// UI Components
import { Error } from '../Common/Error';
import { Loader } from '../Common/Loader';
import { StoryList } from '../Story/StoryList';

export function AutoLoadContainer({ stories, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isUser, isLoadingCenter, message }) {
    const isEnd = useScrollEnd();
    useEffect(() => {
        if (isEnd && hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [isEnd, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage])

    if (isLoading) return <Loader isCenter={isLoadingCenter} />;
    if (error) return <Error message={error.message} />;
    const allStories = stories && stories.pages.flatMap((page) => page.data);
    return (
        <div className='flex justify-center'>
            <div className='max-w-[1350px] w-full'>
                {allStories && <StoryList stories={allStories} isUser={isUser} />}

                {isFetchingNextPage && <Loader />}

                {!hasNextPage && (
                    <h2 className='font-semibold text-center mx-3'>{(allStories.length === 0 && 'No Story found.') || message}</h2>
                )}
            </div>
        </div>
    )
}