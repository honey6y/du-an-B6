import axios from "axios"

class Http {
    constructor() {
        this.instance = axios.create({
            baseURL: 'https://shope-b3.thaihm.site/api',
            timeout: 4000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
const http = new Http().instance

export default http