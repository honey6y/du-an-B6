export const saveTokenToLS = (token) => {
    localStorage.setItem('token', token)
}
export const saveIdCart = (idcart) => {
    localStorage.setItem('idcart', idcart)
}

export const clearTokenFromLS = () => {
    localStorage.removeItem('token')
}

export const getTokenFromLS = () => localStorage.getItem('token') || ''
