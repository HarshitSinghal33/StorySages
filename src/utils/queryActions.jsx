export function removeStoryFromQuery(prevData, storyID) {
    const newData = prevData.pages.map(
        (page) => ({
            ...page,
            data: page.data.filter((story) =>
                story.id !== storyID
            ),
        })
    )
    return { ...prevData, pages: newData }
}

export function addStoryInQuery(prevData, story) {
    const updatedData = {
        ...prevData,
        pages: prevData.pages
            ? [
                { ...prevData.pages[0], data: [story, ...prevData.pages[0].data] }, ...prevData.pages.slice(1)
            ]
            : [{ data: [story] }]
    };
    return updatedData;
}

export function updateStoryInQuery(prevData, updatedStory) {
    const updatedData = {
        ...prevData,
        pages: prevData.pages.map(page => ({
            ...page,
            data: page.data.map(story => {
                if(story.id === updatedStory.id){
                    return updatedStory
                }
                return story
            })
        }))
    }
    return updatedData
}