import type { FC } from "react"
import { GoTo } from "../App";
import { Fragment, useCallback, useState } from "react";
import { get, update } from "../utils/localStorage";
import { i18n } from "../utils/i18n";
import { formatToHuman } from "../utils/todayDate";
import { questions } from "./Questionnaire";
import { MainLayout } from "./MainLayout";
import { cx } from "../utils/cx";

export const AnswersHistory: FC<GoTo> = ({ data, goTo }) => {
    const { opened, tab } = get()?.settings || { opened: false, tab: null }
    const [open, setOpen] = useState<boolean>(opened);
    const [tabIndex, setTabIndex] = useState<number | null>(tab)
    const toggle = useCallback(() => {
        setOpen((prev) => {
            const opened = !prev

            if (!opened) {
                setTabIndex(null)
            }

            update((data) => ({
                settings: {
                    ...data.settings,
                    opened,
                    ...(!opened ? { tab: null } : {})
                },
            }))
            return opened
        })
    }, [setOpen, setTabIndex])
    const setTab = useCallback((tab: number | null) => () => {
        setTabIndex(tab)
        update((data) => ({ settings: { ...data.settings, tab } }))
    }, [setTabIndex])

    return (
        <MainLayout
            header={i18n("answersHistory")}
            headerChildren={
                <button className={cx("settings-button", open && "pressed")} onClick={toggle}/>
            }
            goBackTo={() => goTo("start")}
            headerBlur
        >
            <aside className={cx("subheader", open && "open")}>
                <div className="tabs">
                    {questions.map(({ title }, i) => (
                        <button
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
            </aside>
            {[
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                // ...data.history,
                ...data.history,
            ].map(({ date, answers }, index) => (
                <div key={index} className="history-day">
                    {tabIndex === null ? (
                        <>
                            <div className="history-date">
                                {formatToHuman(date)}
                            </div>
                            <div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] flex-1 overflow-hidden">
                                {questions.map(({ title }, i) => (
                                    <Fragment key={i}>
                                        <div className="py-0.5 flex items-center">{i18n(title)}</div>
                                        <div className="py-0.5 flex items-center">
                                            {answers.find(({ index }) => index === i)?.answer}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="ml-5 text-black/30 dark:text-white/30">{formatToHuman(date)}</div>
                            {questions.map(({ title }, i) => tabIndex === i && (
                                <div key={i}>
                                    {answers.find(({ index }) => index === i)?.answer}
                                </div>
                            ))}
                        </>
                    )}

                    {/*
                    <div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] flex-1 overflow-hidden">
                        {questions.map(({ title }, i) =>
                            tabIndex === null ? (
                                <Fragment key={i}>
                                    <div className="py-0.5 flex items-center">{i18n(title)}</div>
                                    <div className="py-0.5 flex items-center">
                                        {answers.find(({ index }) => index === i)?.answer}
                                    </div>
                                </Fragment>
                            ) : tabIndex === i && (
                                <Fragment key={i}>
                                    {answers.find(({ index }) => index === i)?.answer}
                                </Fragment>
                            ))}
                    </div>
                    */}
                </div>
            ))}
        </MainLayout>
    )
}
