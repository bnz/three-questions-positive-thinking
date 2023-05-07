import type { FC } from "react"
import { GoTo } from "../App";
import { useCallback, useState } from "react";
import { get, update } from "../utils/localStorage";
import { i18n } from "../utils/i18n";
import { formatToHuman } from "../utils/todayDate";
import { questions } from "./Questionnaire";
import { MainLayout } from "./MainLayout";
import { cx } from "../utils/cx";

export const AnswersHistory: FC<GoTo> = ({ data, goTo }) => {
    const { opened, tab, sort: sortSaved } = get()?.settings || { opened: false, tab: null, sort: false }
    const [open, setOpen] = useState<boolean>(opened);
    const [tabIndex, setTabIndex] = useState<number | null>(tab)
    const [sort, setSort] = useState<boolean>(sortSaved)
    const toggle = useCallback(() => {
        setOpen((prev) => {
            const opened = !prev
            if (!opened) {
                setTabIndex(null)
                setSort(false)
            }
            update((data) => ({
                settings: {
                    ...data.settings,
                    opened,
                    ...(!opened ? { tab: null, sort: false } : {})
                },
            }))
            return opened
        })
    }, [setOpen, setTabIndex, setSort])
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

    return (
        <MainLayout
            header={i18n("answersHistory")}
            headerChildren={
                <button
                    className={cx("settings-button", open && "pressed")}
                    onClick={toggle}
                />
            }
            goBackTo={() => goTo("start")}
            headerBlur
        >
            <aside className={cx("subheader", open && "open")}>
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
                    className={cx("sort-button", sort && "sort")}
                    onClick={toggleSort}
                />
            </aside>
            {data.history.sort(({ date: a }, { date: b }) => {
                const [aa, bb] = sort ? [b, a] : [a, b]
                return Date.parse(bb) - Date.parse(aa)
            }).map(({ date, answers }, index) => (
                <div key={index} className="history-day">
                    {tabIndex === null ? [
                        <div key={1} className="history-date">
                            {formatToHuman(date)}
                        </div>,
                        <div key={2} className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] flex-1 overflow-hidden">
                            {questions.map(({ title }, i) => [
                                <div key={i} className="py-0.5 flex items-center">{i18n(title)}</div>,
                                <div key={i + 100000} className="py-0.5 flex items-center">
                                    {answers.find(({ index }) => index === i)?.answer}
                                </div>
                            ])}
                        </div>
                    ] : [
                        <div key={1} className="ml-5 text-black/30 dark:text-white/30">{formatToHuman(date)}</div>,
                        questions.map(({ title }, i) => tabIndex === i && (
                            <div key={i}>
                                {answers.find(({ index }) => index === i)?.answer}
                            </div>
                        ))
                    ]}
                </div>
            ))}
        </MainLayout>
    )
}
