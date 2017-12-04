import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getEventById (eventId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/Events/${eventId}`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching for event id: " + eventId)
        return null
    } 
}

export async function getEventsCreatedByUser(userId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/Events/User/${userId}`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching the event created by user: " + userId)
        return null
    }
}

export async function getEvents() {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/Events`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching the events")
        return null
    }
}

export async function updateEvent(event) {
    console.log(event)

    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .put(`api/Events/${event.eventId}`, event)
    } catch (error) {
        console.log(error)
        alert("An error occurred while updating the event")
        return null
    }
}