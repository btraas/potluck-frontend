import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getItems() {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Items`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching the items")
        return null
    }
}

export async function getItemById(itemId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Items/${itemId}`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching item id: " + itemId)
        return null
    }
}

export async function getRemainingQuotaforItem(itemId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Items/RemainingQuota/${itemId}`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching quota for an item id: " + itemId)
        return null
    }
}

export async function getItemsForEvent(eventId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Items/Event/${eventId}`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching the items for event: " + eventId)
        return null
    }
}