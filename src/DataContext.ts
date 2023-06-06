import { createContext, Dispatch, useContext } from "react"
import { defaultDataSet, Page } from "./utils/localStorage"
import { Actions } from "./mainReducer"

interface Answer {
    index: number
    answer: null | string
}

export interface Data {
    name: string
    page: Page
    history: {
        date: string
        time?: string
        answers: Answer[]
    }[]
    questionnaire: Answer[]
    settings: {
        opened: boolean
        tab: number | null
        sort: boolean
        group: boolean
    }
}

interface DataContextProps {
    goTo(page: Page): () => void
    state: Data
    dispatch: Dispatch<Actions>
}

export const DataContext = createContext<DataContextProps>({
    state: defaultDataSet,
    dispatch() {
    },
    goTo: (page: Data["page"]) => () => {
    },
})

export const useData = (): DataContextProps => useContext(DataContext)
