import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from "react"
import { Welcome } from "./components/Welcome"
import { defaultDataSet, get, update } from "./utils/localStorage"
import { Start } from "./components/Start"
import { Questionnaire } from "./components/Questionnaire"
import { AnswersHistory } from "./components/AnswersHistory"
import { UserSettings } from "./components/UserSettings"

export interface Data {
    name: string
    page: "history" | "start" | "questionnaire" | "userSettings"
    history: {
        date: string
        dayOfWeek?: string
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

const DataContext = createContext<DataContextProps>({
    data: defaultDataSet,
    setData() {
    },
    goTo(page: Data["page"]) {
    }
})

export const useData = (): DataContextProps => useContext(DataContext)

export const App: FC = () => {
    const [data, setData] = useState<Data>(defaultDataSet)
    const [loaded, setLoaded] = useState(false)

    const rawData = get()

    useEffect(() => {
        setTimeout(() => {
            if (rawData !== null) {
                setData(rawData)
            }
            setLoaded(true)
        }, 0)
    }, [rawData, setData, setLoaded])

    const goTo = useCallback((page: Data["page"]) => setData(update({ page })), [setData])

    if (!loaded) {
        return null
    }

    return (
        <DataContext.Provider value={{ data, setData, goTo }}>
            {rawData === null ? (
                <Welcome />
            ) : {
                start: <Start />,
                questionnaire: <Questionnaire />,
                history: <AnswersHistory />,
                userSettings: <UserSettings />,
            }[data.page]}
        </DataContext.Provider>
    )
}
