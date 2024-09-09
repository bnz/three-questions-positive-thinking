import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useData } from "../DataContext"
import { update } from "../utils/localStorage"
import { i18n, SomeKeys } from "../utils/i18n"
import { ActionType } from "../mainReducer"

export const questions: { title: SomeKeys }[] = [
    { title: "wasGood" },
    { title: "gratefulFor" },
    { title: "learnedTo" },
]

const questionsMinCount: Record<string, number> = {
    wasGood: 3,
    gratefulFor: 2,
    learnedTo: 1,
}

export function Questionnaire() {
    const { state, dispatch } = useData()
    const [question, setQuestion] = useState<number | null>(null)
    const [answers, setAnswers] = useState<string[]>([])
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(function () {
        if (state.questionnaire.length > 0) {
            setQuestion(state.questionnaire[state.questionnaire.length - 1].index)
        } else {
            dispatch({ type: ActionType.QUESTIONNAIRE_INIT, payload: undefined })
        }
    }, [state, dispatch, setQuestion])

    const onChange = useCallback(function (index: number) {
        return function (e: ChangeEvent<HTMLInputElement>) {
            setAnswers(function (prevState) {
                prevState[index] = e.target.value
                return [...prevState]
            })
        }
    }, [setAnswers])

    const { title, count } = useMemo(function () {
        const { title } = questions[question || 0]
        const count = questionsMinCount[title]
        return {
            title,
            count,
        }
    }, [question])

    const [fieldsCount, setFieldsCount] = useState(count)

    useEffect(function () {
        setFieldsCount(count)
    }, [count, setFieldsCount])

    const onFieldAdd = useCallback(function () {
        setFieldsCount(function (prevCount) {
            return prevCount + 1
        })
    }, [setFieldsCount])

    const deleteField = useCallback(function (index: number) {
        return function () {
            setFieldsCount(function (prevState) {
                return prevState - 1
            })
            setAnswers(function (prevState) {
                prevState.splice(index, 1)
                return [...prevState]
            })
        }
    }, [setFieldsCount, setAnswers])

    const save = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const index = state.questionnaire.length - 1
        state.questionnaire[index].answer = answers
        const newData = update({ questionnaire: state.questionnaire })
        if (newData.questionnaire.length < 3) {
            setAnswers([])
            setQuestion(newData.questionnaire.length)
            dispatch({ type: ActionType.QUESTIONNAIRE_UPDATE, payload: undefined })
        } else {
            dispatch({ type: ActionType.HISTORY_PUSH, payload: undefined })
        }
        ref.current?.focus()
    }, [answers, state, setAnswers, setQuestion, ref, dispatch])

    const reset = useCallback((e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch({ type: ActionType.QUESTIONNAIRE_RESET, payload: undefined })
        setAnswers([])
        ref.current?.focus()
    }, [ref, setAnswers, dispatch])

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
            <div>
                <h1 className="text-3xl">{i18n(title)}</h1>
                <div className="font-thin opacity-50">
                    ({i18n(count === 1 ? "minAnswer" : "minAnswers").replace("###", `${count}`)})
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {new Array(fieldsCount).fill(null).map(function (_, index) {
                    return (
                        <div key={index} className="md:w-2/3 md:mx-auto outline outline-1 relative rounded">
                            <input
                                placeholder={`${index + 1}`}
                                type="text"
                                {...(index === 0 ? { autoFocus: true } : {})}
                                className="w-full focus:bg-white/20 dark:focus:bg-black/20"
                                value={answers[index] || ""}
                                autoComplete="off"
                                onChange={onChange(index)}
                            />
                            {index >= count && (
                                <button
                                    type="button"
                                    className="remove-field-button"
                                    onClick={deleteField(index)}
                                />
                            )}
                        </div>
                    )
                })}
                <div className="md:w-2/3 md:mx-auto text-right">
                    <button type="button" onClick={onFieldAdd}>
                        {i18n("moreAnswer")}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={answers.filter(function (val) {
                    return val && val !== ""
                }).length < count}
                className="rainbow-button save-icon mx-auto w-1/2 md:w-1/3"
            >
                <span>{i18n("save")}</span>
            </button>
        </form>
    )
}
