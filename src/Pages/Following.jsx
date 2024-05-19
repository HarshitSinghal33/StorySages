import React from 'react';

// Custom Hooks
import { useFetchUserData } from '../Hooks/Fetches/useFetchUserData';
import { useFetchWithID } from '../Hooks/Fetches/useFetchWithID';

// UI Components
import { Header } from '../Components/Common/Header';
import { ManualLoadContainer } from '../Components/Containers/ManualLoadContainer';
import { Loader } from '../Components/Common/Loader';
import { Error } from '../Components/Common/Error';

export function Following() {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true });

    const reversedFollowingArray = userData && (userData.following ? [...userData.following].reverse() : []);

    const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useFetchWithID({type:'following', idsArray: reversedFollowingArray,fetchFromCollection: 'users'});
    function renderContent() {
        if (isLoading || isUserDataLoading) return <Loader isCenter={true} />;

        if (error || userDataError) return <Error message={error.message || userDataError.message} />;

        return (
            <ManualLoadContainer
                data={data}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFollowing={true}
            />
        )
    }
    return (
        <>
            <Header back={true} />
            {renderContent()}
        </>
    )
}