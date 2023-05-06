import type { FC } from "react"
import { GoTo } from "../App"
import { MainLayout } from "./MainLayout"
import { formatToHuman } from "../utils/todayDate"
import { Fragment } from "react"
import { questions } from "./Questionnaire"
import { i18n } from "../utils/i18n"

export const History: FC<GoTo> = ({ data, goTo }) => {
    return (
        <MainLayout header="История ответов" goBackTo={() => goTo("start")} headerBlur>
            {[
                ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
            ].map(({ date, answers }, index) => (
                <div key={index} className="border-t first-of-type:border-t-0 border-t-gray-300 dark:border-t-gray-700 px-2 flex gap-10 pl-5 py-2">
                    <div className="my-2 inline-block max-w-min text-center">
                        {formatToHuman(date)}
                    </div>
                    <div className="grid grid-cols-[150px_1fr] flex-1">
                        {questions.map(({ title }, i) => {
                            console.log(answers)
                            return (
                                <Fragment key={i}>
                                    <div className="py-0.5">{i18n(title)}</div>
                                    <div className="py-0.5">{answers.find(({ index }) => index === i)?.answer}</div>
                                </Fragment>
                            )
                        })}
                        {answers.map(({ index: j, answer }, i) => (
                            <Fragment key={i}>
                                <div className="py-0.5">{i18n(questions[j].title)}</div>
                                <div className="py-0.5">{answer}</div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            ))}
        </MainLayout>
    )
}
