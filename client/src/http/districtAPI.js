import { $authhost, $host } from "."

export const createDistrict = async (district) => {
    const {data} = await $authhost.post('api/district', district)
    return data
}

export const fetchDistrict = async () => {
    const {data} = await $authhost.get('api/district')
    return data
}

export const deleteDistrict = async (id) => {
    const {data} = await $authhost.delete('api/district/' + id)
    return data
}

export const updateDistrict = async (id, name) => {
    const {data} = await $authhost.put('api/district/' + id, name)
    return data
}