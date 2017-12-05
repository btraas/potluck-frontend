import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getPledges() {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Pledges`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching the pledges")
        return null
    }
}

export async function getPledgesByUserId(userId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                             .get(`api/Pledges/User/${userId}`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching pledges for user id: " + userId)
        return null
    }
}