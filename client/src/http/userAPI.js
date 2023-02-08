import { $authhost, $host } from "."
import jwt_decode from "jwt-decode"


export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authhost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkRole = async () => {
    const {data} = await $authhost.get('api/user/auth')
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $authhost.get('api/user/users')
    return data
}

export const logOut = async () => {
    const {data} = await $authhost.get('api/user/auth')
    localStorage.removeItem('token')
    // return jwt_decode(data.token)
}