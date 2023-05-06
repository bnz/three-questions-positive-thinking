import { Data } from "../App"

export const lsKey = "history"

export const create = (name: string): Data => {
    const data: Data = {
        name,
        page: "start",
        history: [],
        questionnaire: [],
    }
    window.localStorage.setItem(lsKey, JSON.stringify(data))
    return data
}

export const get = (): Data | null => {
    let data: Data | null = null
    try {
        const item = localStorage.getItem(lsKey)
        if (item !== null) {
            data = JSON.parse(item) as Data
        }
    } catch (e) {
        console.error(e)
    }
    return data
}

export const update = (newData: Partial<Data>): Data => {
    const dataString = window.localStorage.getItem(lsKey)

    let res = newData

    if (dataString !== null) {
        try {
            const data = JSON.parse(dataString)

            res = {
                ...data,
                ...newData,
            }

        } catch (e) {
            console.error(e)
        }
    }

    window.localStorage.setItem(lsKey, JSON.stringify(res))

    return res as Data // FIXME
}
