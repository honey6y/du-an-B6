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

export const getProfileFromLS = () => {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : ''
}
export const setProfileToLS = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}