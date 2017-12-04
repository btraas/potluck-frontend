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

export async function addInvitations(eventId, userIds){
    let args = userIds.map((userId, index) => (
        {
            eventId : eventId,
            applicationUserId: userId,
            status: 3
        }
    ));
    for(let i = 0; i< args.length; i++) {
        try {
            return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                .post(`api/Invitations`, args[i])
        } catch (error) {
            console.log(error)
            alert("An error occurred while adding invite")
            return null
        }
    }
}