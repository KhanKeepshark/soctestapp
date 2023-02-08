import { $authhost, $host } from "."

export const createAnswer = async (question) => {
    const {data} = await $authhost.post('api/answer', question)
    return data
}

export const fetchAnswers = async () => {
    const {data} = await $authhost.get('api/answer')
    return data
}

export const deleteAnswers = async (id) => {
    const {data} = await $authhost.delete('api/answer/' + id)
    return data
}