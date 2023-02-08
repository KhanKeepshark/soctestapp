import { $authhost, $host } from "."

export const createRegion = async (region) => {
    const {data} = await $authhost.post('api/region', region)
    return data
}

export const fetchRegion = async () => {
    const {data} = await $authhost.get('api/region')
    return data
}

export const updateRegion = async (id, name) => {
    const {data} = await $authhost.put('api/region/' + id, name)
    return data
}

export const deleteRegion = async (id) => {
    const {data} = await $authhost.delete('api/region/' + id)
    return data
}