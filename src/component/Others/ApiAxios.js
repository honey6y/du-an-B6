import axios from "axios"
import { getTokenFromLS, saveTokenToLS } from "../../actionLocal/ActionLocal";

class Http {
    constructor() {
        this.token = getTokenFromLS()
        this.instance = axios.create({
            baseURL: 'https://ecommerce.nodemy.vn/api/v1',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use((config) => {
            if(this.token) {
                config.headers.Authorization = this.token
                return config
            }
            return config
        }, function (error) {
            return Promise.reject(error);
        });
        this.instance.interceptors.response.use( 
            (response) => {
            const {url} = response.config
            if( url === "/auth/login") {
                this.token = response.data.token
                saveTokenToLS(this.token)
            }
            return response;
          }, function (error) {
            return Promise.reject(error);
          });
    }
}
const http = new Http().instance

export default http