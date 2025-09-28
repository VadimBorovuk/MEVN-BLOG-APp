import {axiosInstance} from "../utils/axios.ts";

export function getAuthCheck() {
  return axiosInstance({
    url: `/auth/check`,
    method: 'get'
  })
}

export function loginAuth(data) {
  return axiosInstance({
    url: `/auth/login`,
    method: 'post',
    data
  })
}

export function signupAuth(data) {
  return axiosInstance({
    url: `/auth/signup`,
    method: 'post',
    data
  })
}
