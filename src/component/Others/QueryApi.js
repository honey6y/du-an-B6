import http from "./ApiAxios";

export const registerAccount = (body) => http.post('/auth/sign-up', body)
export const login = (body) => http.post('/auth/sign-in', body)