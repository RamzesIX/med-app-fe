import axios from 'axios'
import { globalConstants } from '../core/constants'

// HttpClient is used for base API url encapsulation
export const HttpClient = axios.create({
    baseURL: globalConstants.apiUrl,
})

// TODO use an interface that is not bound to Axios api
export type IHttpClient = typeof HttpClient
