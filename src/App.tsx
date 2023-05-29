import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Welcome } from "./components/Welcome"
import { defaultDataSet, get, update } from "./utils/localStorage"
import { Start } from "./components/Start"
import { Questionnaire } from "./components/Questionnaire"
import { AnswersHistory } from "./components/AnswersHistory"
import { UserSettings } from "./components/UserSettings"
import { Data, DataContext } from "./DataContext"

export const App: FC = () => {
    const [data, setData] = useState<Data>(defaultDataSet)
    const [loaded, setLoaded] = useState(false)
    const rawData = useMemo(get, [data])

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
