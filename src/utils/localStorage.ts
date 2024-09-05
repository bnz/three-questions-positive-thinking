import { Data } from "../DataContext"

export const lsKey = "history"

export enum Page {
    HISTORY = "history",
    START = "start",
    USER_SETTINGS = "userSettings",
}

export const defaultDataSet: Data = {
    name: "",
    page: Page.START,
    history: [],
    questionnaire: [],
    settings: {
        opened: false,
        tab: null,
        sort: false,
        group: true,
    },
}

export function create(name: string): Data {
    const data: Data = {
        ...defaultDataSet,
        name,
    }
    window.localStorage.setItem(lsKey, JSON.stringify(data))
    return data
}

export function get(): Data | null {
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

export function update(newData: Partial<Data> | ((data: Data) => Partial<Data>)): Data {
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

export function clear(): Data {
    window.localStorage.removeItem(lsKey)
    return defaultDataSet
}
