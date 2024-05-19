export function removeDataFromQuery(prevData, storyID) {
    const newData = prevData.pages.map(
        (page) => ({
            ...page,
            data: page.data.filter((data) => {
                if(data.storyID){
                    return data.storyID !== storyID
                }
                if(data.id){
                    return data.id !== storyID
                }
            }),
        })
    )
    return { ...prevData, pages: newData }
}

export function addDataInQuery(prevData, addedData) {
    const updatedData = {
        ...prevData,
        pages: prevData.pages
            ? [
                { ...prevData.pages[0], data: [addedData, ...prevData.pages[0].data] }, ...prevData.pages.slice(1)
            ]
            : [{ data: [addedData] }]
    };
    return updatedData;
}

export function updateStoryInQuery(prevData, updatedStory) {
    const updatedData = {
        ...prevData,
        pages: prevData.pages.map(page => ({
            ...page,
            data: page.data.map(story => {
                if (story.storyID === updatedStory.storyID) {
                    return updatedStory
                }
                return story
            })
        }))
    }
    return updatedData
}