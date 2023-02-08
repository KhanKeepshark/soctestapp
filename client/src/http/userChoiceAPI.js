import { $authhost } from "."

export const createUserChoice = async (userchoice) => {
    const {data} = await $authhost.post('api/userchoice', userchoice)
    return data
}

export const fetchUserChoice = async () => {
    const {data} = await $authhost.get('api/userchoice')
    return data
}

export const deleteQuestions = async (id) => {
    const {data} = await $authhost.delete('api/userdata/' + id)
    return data
}