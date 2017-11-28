import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getInvitations() {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/Invitations`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching the invitations")
        return null
    } 
}

export async function getInvitationById(invitationId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/Invitations/${invitationId}`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching for invitation id: " + invitationId)
        return null
    }
}