import http from "./ApiAxios";

export const registerAccount = (body) => http.post('/auth/register', body)
export const login = (body) => http.post('/auth/login', body)

const URL = `/product/find-products-by-name`
const URLcategory = `/category/get-all-categories`
export const productApi = {
    getProductName(params) {
        return http.get(URL,{
            params
        })
    },
    getCategory(){
        return http.get(URLcategory)
    }
}
export const userApi = {
    getProfile() {
        return http.get('/auth/me')
    },
    updateProfile(_id){
        return http.patch('/user', _id)
    },
    upLoadAvatar (body) {
        return http.patch('/user/change-avatar', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}