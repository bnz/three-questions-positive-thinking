import type { FC } from "react"
import { Fragment, useCallback, useState } from "react"
import { defaultDataSet, get, Page, update } from "../utils/localStorage"
import { i18n } from "../utils/i18n"
import { currentDayOfWeek, formatToHuman, getMonth } from "../utils/todayDate"
import { questions } from "./Questionnaire"
import { MainLayout } from "./MainLayout"
import { cx } from "../utils/cx"
import { useData } from "../DataContext"

export const AnswersHistory: FC = () => {
    const { goTo, state } = useData()
    const { opened, tab, sort: sortSaved, group: groupSaved } = get()?.settings || defaultDataSet.settings
    const [open, setOpen] = useState<boolean>(opened)
    const [tabIndex, setTabIndex] = useState<number | null>(tab)
    const [sort, setSort] = useState<boolean>(sortSaved)
    const [group, setGroup] = useState<boolean>(groupSaved)

    const toggle = useCallback(() => {
        setOpen((prev) => {
            const opened = !prev
            if (!opened) {
                setTabIndex(null)
                setSort(false)
                setGroup(true)
            }
            update((data) => ({
                settings: {
                    ...data.settings,
                    opened,
                    ...(!opened ? { tab: null, sort: false } : {}),
                },
            }))
            return opened
        })
    }, [setOpen, setTabIndex, setSort, setGroup])

    const setTab = useCallback((tab: number | null) => () => {
        setTabIndex(tab)
        update((data) => ({ settings: { ...data.settings, tab } }))
    }, [setTabIndex])
    const toggleSort = useCallback(() => {
        setSort((prev) => {
            const sort = !prev
            update((data) => ({ settings: { ...data.settings, sort } }))
            return sort
        })
    }, [setSort])

    const toggleGroup = useCallback(() => {
        setGroup((prev) => {
            const group = !prev
            update((data) => ({ settings: { ...data.settings, group } }))
            return group
        })
    }, [setGroup])

    let prev = ""

    return (
        <MainLayout
            header={
                <>
                    <span className="history-icon" />
                    {i18n("answersHistory")}
                </>
            }
            headerChildren={
                <button
                    className={cx("settings-button", open && "pressed")}
                    onClick={toggle}
                />
            }
            goBackTo={goTo(Page.START)}
            headerBlur
        >
            {open && (
                <aside className="subheader">
                    <div className="tabs">
                        {questions.map(({ title }, i) => (
                            <button
                                key={i}
                                className={cx(tabIndex === i ? "selected" : "tab")}
                                onClick={setTab(i)}
                            >
                                {i18n(title)}
                            </button>
                        ))}
                        <button
                            className={cx("clear", tabIndex !== null && "shown")}
                            onClick={setTab(null)}
                        />
                    </div>
                    <button
                        className={cx("group-button", group && "group")}
                        onClick={toggleGroup}
                    >
                        G
                    </button>
                    <button
                        className={cx("sort-button", sort && "sort")}
                        onClick={toggleSort}
                    />
                </aside>
            )}
            {state.history.sort(({ date: a }, { date: b }) => {
                const [aa, bb] = sort ? [b, a] : [a, b]
                return Date.parse(bb) - Date.parse(aa)
            }).map(({ date, time, answers }, index) => {

                const month = getMonth(date)
                let Render: FC = () => null
                if (prev !== month && group) {
                    prev = month
                    Render = () => (
                        <div className={cx("month-heading", open ? "top-[140px]" : "top-[96px]")}>
                            <div>{month}</div>
                        </div>
                    )
                }

                return (
                    <Fragment key={index}>
                        <Render />
                        <div className="history-day">
                            {tabIndex === null ? [
                                <div key={1} className={cx("history-date", time ? "py-0.5 px-2" : "p-2")}>
                                    <div className="additional">
                                        {currentDayOfWeek(date)}
                                    </div>
                                    <strong className={cx(group && "text-xl", "font-normal")}>
                                        {formatToHuman(date, !group)}
                                    </strong>
                                    {time && (
                                        <div className="additional">{time}</div>
                                    )}
                                </div>,
                                <div
                                    key={2}
                                    className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] flex-1 overflow-hidden"
                                >
                                    {questions.map(({ title }, i) => [
                                        <div key={i} className="py-0.5 flex items-start">{i18n(title)}</div>,
                                        <div key={i + 100000} className="py-0.5 flex flex-col items-start">
                                            {answers.find(({ index }) => index === i)?.answer?.split(",").map((str, i) => (
                                                <div key={i} className="w-full">{str.trim()}</div>
                                            ))}
                                        </div>,
                                    ])}
                                </div>,
                            ] : [
                                <div key={1}
                                    className="ml-5 text-black/30 dark:text-white/30 flex gap-1 whitespace-nowrap w-1/3 md:w-1/4">
                                    {formatToHuman(date, !group)}
                                    {time && (
                                        <span>{time}</span>
                                    )}
                                    <span className="uppercase">{currentDayOfWeek(date)}</span>
                                </div>,
                                questions.map(({ title }, i) => tabIndex === i && (
                                    <div key={i}>
                                        {answers.find(({ index }) => index === i)?.answer}
                                    </div>
                                )),
                            ]}
                        </div>
                    </Fragment>
                )
            })}
        </MainLayout>
    )
}
