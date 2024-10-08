import { Fragment, useState } from "react"
import { defaultDataSet, get, Page } from "../utils/localStorage"
import { i18n } from "../utils/i18n"
import { currentDayOfWeek, formatToHuman, getMonth, getYear } from "../utils/todayDate"
import { questions } from "./Questionnaire"
import { MainLayout } from "./MainLayout"
import { cx } from "../utils/cx"
import { useData } from "../DataContext"

export function AnswersHistory() {
    const { goTo, state } = useData()
    const { sort: sortSaved, group: groupSaved } = get()?.settings || defaultDataSet.settings
    const [sort] = useState<boolean>(sortSaved)
    const [group] = useState<boolean>(groupSaved)

    let prev = ""

    return (
        <MainLayout
            header={
                <>
                    <span className="history-icon" />
                    {i18n("answersHistory")}
                </>
            }
            goBackTo={goTo(Page.START)}
            headerBlur
        >
            {state.history.sort(function ({ date: a }, { date: b }) {
                const [aa, bb] = sort ? [b, a] : [a, b]
                return Date.parse(bb) - Date.parse(aa)
            }).map(function ({ date, time, answers }, index) {

                const month = getMonth(date)
                const year = getYear(date)
                let Render = function (): JSX.Element | null {
                    return null
                }
                if (prev !== month && group) {
                    prev = month
                    Render = function () {
                        return (
                            <div className="month-heading top-[96px]">
                                <div>{month}</div>
                                <div>{year}</div>
                            </div>
                        )
                    }
                }

                return (
                    <Fragment key={index}>
                        <Render />
                        <div className="history-day">
                            <div className={cx("history-date", time ? "py-0.5 px-2" : "p-2")}>
                                <div className="additional">
                                    {currentDayOfWeek(date)}
                                </div>
                                <strong className={cx(group && "text-xl", "font-normal")}>
                                    {formatToHuman(date, !group)}
                                </strong>
                                {time && (
                                    <div className="additional">{time}</div>
                                )}
                            </div>
                            {/*<div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] flex-1 overflow-hidden">*/}
                            <div className="flex-1 overflow-hidden">
                                {questions.map(function ({ title }, i) {
                                    return (
                                        <Fragment key={i}>
                                            <div className="py-0.5 flex items-start mb-2 font-bold">
                                                {i18n(title)}
                                            </div>
                                            <ol className="py-0.5 flex flex-col items-start mb-3 list-decimal list-inside">
                                                {(answers.find(function ({ index }) {
                                                    return index === i
                                                })?.answer || []).map(function (str, i) {
                                                    return <li key={i} className="w-full">{str.trim()}</li>
                                                })}
                                            </ol>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </Fragment>
                )
            })}
        </MainLayout>
    )
}
