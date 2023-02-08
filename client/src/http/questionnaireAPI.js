import { $authhost } from "."

export const createQuestionnaire = async (region) => {
    const {data} = await $authhost.post('api/questionnaire', region)
    return data
}

export const fetchQuestionnaire = async () => {
    const {data} = await $authhost.get('api/questionnaire')
    return data
}

export const updateQuestionnaire = async (id, name) => {
    const {data} = await $authhost.put('api/questionnaire/' + id, name)
    return data
}

export const deleteQuestionnaire = async (id) => {
    const {data} = await $authhost.delete('api/questionnaire/' + id)
    return data
}