import type { ChangeEvent, FC } from "react"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { generateRandom, randomIntFromInterval } from "../utils/randomIntFromInterval"
import { DataProps } from "../App"
import { update } from "../utils/localStorage"
import { todayDate } from "../utils/todayDate"
import { MainLayout } from "./MainLayout"
import { i18n, SomeKeys } from "../utils/i18n"

export const questions: { title: SomeKeys }[] = [
    { title: "iFeel" },
    { title: "iLove" },
    { title: "iWant" },
]

export const Questionnaire: FC<DataProps> = ({ data, setData }) => {
    const [question, setQuestion] = useState<number | null>(null)
    const [answer, setAnswer] = useState("")
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const { questionnaire } = data
        if (questionnaire.length > 0) {
            const { index } = questionnaire[questionnaire.length - 1]
            setQuestion(index)
        } else {
            setData(update({
                questionnaire: [
                    {
                        index: randomIntFromInterval(0, 2),
                        answer: null,
                    },
                ],
            }))
        }
    }, [data, setQuestion, setData])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }, [setAnswer])

    const save = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { questionnaire } = data
        const index = questionnaire.length - 1
        questionnaire[index].answer = answer
        const newData = update({ questionnaire })
        setData(newData)
        if (newData.questionnaire.length < 3) {
            setAnswer("")
            setQuestion(newData.questionnaire.length)
            setData(update({
                questionnaire: [
                    ...newData.questionnaire,
                    {
                        index: generateRandom(newData.questionnaire.map(({ index }) => index)),
                        answer: null,
                    },
                ],
            }))
        } else {
            setData(update({
                page: "start",
                history: [
                    ...newData.history,
                    {
                        date: todayDate(),
                        answers: newData.questionnaire,
                    },
                ],
                questionnaire: [],
            }))
        }
        ref.current?.focus()
    }, [answer, data, setData, setAnswer, setQuestion, ref])

    const reset = useCallback(() => {
        setData(update({
            questionnaire: [],
        }))
        setAnswer("")
        ref.current?.focus()
    }, [setData, ref, setAnswer])

    if (question === null) {
        return null
    }

    return (
        <MainLayout
            header={
                <>
                    <span className="font-bold">{data.questionnaire.length}</span>
                    <span className="text-gray-500 font-light ml-1">/ {questions.length}</span>
                </>
            }
            goBackTo={() => setData(update({ page: "start" }))}
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
                    type="submit"
                    disabled={answer === ""}
                    className="mx-auto w-1/2 md:w-1/3"
                >
                    {i18n("save")}
                </button>
            </form>
        </MainLayout>
    )
}
