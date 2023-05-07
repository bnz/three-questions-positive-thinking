import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { StartForm } from "./components/StartForm"
import { get, update } from "./utils/localStorage"
import { Start } from "./components/Start"
import { Questionnaire } from "./components/Questionnaire"
import { AnswersHistory } from "./components/AnswersHistory";

export interface Data {
    name: string
    page: "history" | "start" | "questionnaire"
    history: {
        date: string
        answers: { index: number, answer: null | string }[]
    }[]
    questionnaire: { index: number, answer: null | string }[]
    settings: {
        opened: boolean
        tab: number | null
    }
}

export interface DataProps {
    data: Data
    setData: Dispatch<SetStateAction<null | Data>>
}

export interface GoTo {
    data: Data
    goTo(page: Data["page"]): void
}

export const App: FC = () => {
    const [data, setData] = useState<null | Data>(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setData(get())
            setLoaded(true)
        }, 0)
    }, [setData, setLoaded])

    const goTo = useCallback((page: Data["page"]) => setData(update({ page })), [setData])

    if (!loaded) {
        return null
    }

    return data === null ? (
        <StartForm setData={setData} />
    ) : {
        start: <Start data={data} goTo={goTo} />,
        questionnaire: <Questionnaire data={data} setData={setData} />,
        history: <AnswersHistory data={data} goTo={goTo} />,
    }[data.page]
}
