import { $authhost } from "."

export const createUserData = async (userdata) => {
    const {data} = await $authhost.post('api/userdata', userdata)
    return data
}

export const fetchUserData = async () => {
    const {data} = await $authhost.get('api/userdata')
    return data
}

export const deleteQuestions = async (id) => {
    const {data} = await $authhost.delete('api/userdata/' + id)
    return data
}