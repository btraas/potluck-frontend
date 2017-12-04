/**
 * Created by Matthew on 2017-12-01.
 */
import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getUsers () {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
            .get(`api/Users`)
    } catch (error) {
        console.log(error)
        alert("An error occurred while fetching for users")
        return null
    }
}
