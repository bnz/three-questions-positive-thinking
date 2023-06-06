import type { ChangeEvent, FC } from "react"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useData } from "../DataContext"
import { Page, update } from "../utils/localStorage"
import { MainLayout } from "./MainLayout"
import { i18n, SomeKeys } from "../utils/i18n"
import { ActionType } from "../mainReducer"

export const questions: { title: SomeKeys }[] = [
    { title: "iFeel" },
    { title: "iLove" },
    { title: "iWant" },
]

export const Questionnaire: FC = () => {
    const { state, dispatch, goTo } = useData()
    const [question, setQuestion] = useState<number | null>(null)
    const [answer, setAnswer] = useState("")
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (state.questionnaire.length > 0) {
            setQuestion(state.questionnaire[state.questionnaire.length - 1].index)
        } else {
            dispatch({ type: ActionType.QUESTIONNAIRE_INIT, payload: undefined })
        }
    }, [state, dispatch, setQuestion])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }, [setAnswer])

    const save = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const index = state.questionnaire.length - 1
        state.questionnaire[index].answer = answer
        const newData = update({ questionnaire: state.questionnaire })
        if (newData.questionnaire.length < 3) {
            setAnswer("")
            setQuestion(newData.questionnaire.length)
            dispatch({ type: ActionType.QUESTIONNAIRE_UPDATE, payload: undefined })
        } else {
            dispatch({ type: ActionType.HISTORY_PUSH, payload: undefined })
        }
        ref.current?.focus()
    }, [answer, state, setAnswer, setQuestion, ref, dispatch])

    const reset = useCallback(() => {
        dispatch({ type: ActionType.QUESTIONNAIRE_RESET, payload: undefined })
        setAnswer("")
        ref.current?.focus()
    }, [ref, setAnswer, dispatch])

    if (question === null) {
        return null
    }

    return (
        <MainLayout
            header={
                <>
                    <span className="font-bold">{state.questionnaire.length}</span>
                    <span className="text-gray-500 font-light ml-1">/ {questions.length}</span>
                </>
            }
            goBackTo={goTo(Page.START)}
            headerChildren={
                <button className="restart-button" onClick={reset} />
            }
        >
            <form className="text-center flex flex-col gap-10 my-10 mx-5 md:mx-20" onSubmit={save}>
                <h1 className="text-3xl">{i18n(questions[question].title)}...</h1>
                <input
                    ref={ref}
                    type="text"
                    autoFocus
                    className="md:w-2/3 md:mx-auto"
                    autoComplete="off"
                    value={answer}
                    onChange={onChange}
                />
                <button
                    disabled={answer === ""}
                    className="rainbow-button save-icon mx-auto w-1/2 md:w-1/3"
                >
                    <span>{i18n("save")}</span>
                </button>
            </form>
        </MainLayout>
    )
}
