import { createContext, Dispatch, SetStateAction, useContext } from "react"
import { defaultDataSet } from "./utils/localStorage"

export interface Data {
    name: string
    page: "history" | "start" | "questionnaire" | "userSettings"
    history: {
        date: string
        time?: string
        answers: { index: number, answer: null | string }[]
    }[]
    questionnaire: { index: number, answer: null | string }[]
    settings: {
        opened: boolean
        tab: number | null
        sort: boolean
    }
}

interface DataContextProps {
    data: Data
    setData: Dispatch<SetStateAction<Data>>

    goTo(page: Data["page"]): void
}

export const DataContext = createContext<DataContextProps>({
    data: defaultDataSet,
    setData() {
    },
    goTo(page: Data["page"]) {
    }
})

export const useData = (): DataContextProps => useContext(DataContext)
