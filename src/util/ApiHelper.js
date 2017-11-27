import axios from 'axios'
import Config from '../config/Config'


export default class ApiHelper {
    header = {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json',
    }

    headers = (opts) => {
        this.header =  { ...this.header, ...opts }
        return this
    }

    get = async (url) => {
        return await this.xhr(url, null, 'GET');
    }

    put = async (url, params) => {
        return await this.xhr(url, params, 'PUT')
    }

    post = async (url, params) => {
        return await this.xhr(url, params, 'POST')
    }

    delete = async (url, params) => {
        return await this.xhr(url, params, 'DELETE')
    }

    xhr = async (url, params, verb) => {
        console.log(url)
        console.log(`${Config.url}${url}`)

        try {
            let opts     = {}
            opts.method  = verb,
            opts.headers = this.header,
            opts.data    = params ?  JSON.stringify(params) : null
            
            let response = await axios({ url :`${Config.url}${url}`,  ...opts })
            
            return response.data
        } catch(e) {
            console.error(e)
            return null;
        }
    }
}