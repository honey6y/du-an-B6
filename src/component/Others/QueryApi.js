import http from "./ApiAxios";

export const registerAccount = (body) => http.post('/auth/register', body)
export const login = (body) => http.post('/auth/login', body)

const URL = `/product/find-product-by-name`
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
    updateProfile(body){
        return http.patch(`/user/update-user-info/${body.id}`,body)
    },
    upLoadAvatar(body) {
        return http.patch('/user/change-avatar', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    changePassword(body){
        return http.patch(`/user/change-password/${body.id}`, body)
    },
    getIdCard(){
        return http.get(`/cart/get-loged-in-cart`)
    }
}

export const getAvatarUrl = (avatarName) => {
    if(avatarName) {
        if(avatarName.includes('https://st3.depositphotos.com/')) {
            return avatarName
        }else {
            return `https://ecommerce.nodemy.vn/${avatarName}`
        }

    } else {
        return `https://ecommerce.nodemy.vn/${avatarName}`
    }
    // if(avatarName.includes('https://st3.depositphotos.com/')) {
    //         return avatarName
    // }
    // else {
    //     return `https://ecommerce.nodemy.vn/${avatarName}`
    // }
}