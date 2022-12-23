import axios, { AxiosError } from "axios"
import { ErrorStatusCode } from "./ListErrorAxios"

export function isAxiosError(error) {
    return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error) {
    return isAxiosError(error) && error.response?.status === ErrorStatusCode.BadRequest
}
export function isAxiosUnprocessableEntityERR(error){
    return isAxiosError(error) && error.response?.status === ErrorStatusCode.UnprocessableEntity
  }