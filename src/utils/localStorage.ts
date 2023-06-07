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

export const create = (name: string): Data => {
    const data: Data = {
        ...defaultDataSet,
        name,
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

export const clear = (): Data => {
    window.localStorage.removeItem(lsKey)
    return defaultDataSet
}
