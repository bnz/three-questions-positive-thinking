import type { ChangeEvent, FC } from "react"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useData } from "../DataContext"
import { update } from "../utils/localStorage"
import { i18n, SomeKeys } from "../utils/i18n"
import { ActionType } from "../mainReducer"

export const questions: { title: SomeKeys }[] = [
    { title: "iFeel" },
    { title: "iLove" },
    { title: "iWant" },
]

export const Questionnaire: FC = () => {
    const { state, dispatch } = useData()
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

    const reset = useCallback((e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log("reset")
        dispatch({ type: ActionType.QUESTIONNAIRE_RESET, payload: undefined })
        setAnswer("")
        ref.current?.focus()
    }, [ref, setAnswer, dispatch])

    if (question === null) {
        return null
    }

    return (
        <form className="questionnaire-form" onSubmit={save}>
            <div>
                <span className="font-bold">{state.questionnaire.length}</span>
                <span className="text-gray-500 font-light ml-1">/ {questions.length}</span>
            </div>
            <button type="button" className="restart-button" onClick={reset} />
            <h1 className="text-3xl">{i18n(questions[question].title)}...</h1>
            <input
                ref={ref}
                type="text"
                autoFocus
                className="md:w-2/3 md:mx-auto focus:bg-white/20 dark:focus:bg-black/20"
                autoComplete="off"
                value={answer}
                onChange={onChange}
            />
            <button
                type="submit"
                disabled={answer === ""}
                className="rainbow-button save-icon mx-auto w-1/2 md:w-1/3"
            >
                <span>{i18n("save")}</span>
            </button>
        </form>
    )
}
