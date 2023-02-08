import { $authhost, $host } from "."

export const createQuestion = async (question) => {
    const {data} = await $authhost.post('api/question', question)
    return data
}

export const fetchQuestions = async () => {
    const {data} = await $authhost.get('api/question')
    return data
}

export const deleteQuestions = async (id) => {
    const {data} = await $authhost.delete('api/question/' + id)
    return data
}

export const updateQuestions = async (id, name) => {
    const {data} = await $authhost.put('api/question/' + id, name)
    return data
}