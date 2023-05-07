import { Data } from "../App"
import { type } from "@testing-library/user-event/dist/type";

export const lsKey = "history"

export const create = (name: string): Data => {
    const data: Data = {
        name,
        page: "start",
        history: [],
        questionnaire: [],
        settings: { opened: false, tab: null }
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

type Update = (newData: Partial<Data> | ((data: Data) => Partial<Data>)) => Data

export const update: Update = (newData) => {
    const dataString = window.localStorage.getItem(lsKey)

    let res: Partial<Data> | "" = ""

    if (dataString !== null) {
        try {
            const data = JSON.parse(dataString)

            if (typeof newData === "function") {
                res = {
                    ...data,
                    ...newData(data),
                }
            } else {
                res = {
                    ...data,
                    ...newData,
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    window.localStorage.setItem(lsKey, JSON.stringify(res))

    return res as Data // FIXME
}
