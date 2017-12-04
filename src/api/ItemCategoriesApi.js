import ApiHelper from '../util/ApiHelper'

const API = new ApiHelper()

export async function getItemCategories() {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/ItemCategories`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching the item categories")
        return null
    }
}

export async function getItemCategoryById(categoryId) {
    try {
        return await API.headers({ "Authorization" : `Bearer ${sessionStorage.getItem("access_token")}` })
                        .get(`api/ItemCategories/${categoryId}`)
    } catch(error) {
        console.log(error)
        alert("An error occurred while fetching item category " + categoryId)
        return null
    }
}