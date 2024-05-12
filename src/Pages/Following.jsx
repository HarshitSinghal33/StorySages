import React from 'react';

// Custom Hooks
import useFetchUserData from '../hooks/fetch/useFetchUserData';
import useFetchWithID from '../hooks/fetch/useFetchWithID';

// UI Components
import Header from '../Components/Common/Header';
import ManualLoadContainer from '../Components/Containers/ManualLoadContainer';
import Loader from '../Components/Common/Loader';
import Error from '../Components/Common/Error';

export default function Following() {
    const { userData, userDataError, isUserDataLoading } = useFetchUserData({ isPrivate: true });

    const reversedFollowingArray = userData && (userData.following ? [...userData.following].reverse() : []);

    const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useFetchWithID('following', reversedFollowingArray, true);

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