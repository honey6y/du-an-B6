export const saveTokenToLS = (token) => {
    localStorage.setItem('token', token)
}
export const saveIdCart = (token) => {
    localStorage.setItem('idcart', token)
}

export const clearTokenFromLS = () => {
    localStorage.removeItem('token')
}

export const getTokenFromLS = () => localStorage.getItem('token') || ''
