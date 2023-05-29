import type { FC } from "react"
import { create } from "../utils/localStorage"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"
import { NameForm } from "./NameForm"
import { useData } from "../DataContext"
import { useCallback } from "react"

export const Welcome: FC = () => {
    const { setData, goTo } = useData()
    const onSubmit = useCallback((name: string) => {
        setData(create(name))
        goTo("start")
    }, [setData, goTo])

    return (
        <MainLayout header={i18n("hello")}>
            <div className="my-10 w-32 h-32 mx-auto bg-no-repeat bg-[url('./assets/hug.svg')]" />
            <p className="text-center mb-5">
                {i18n("enterYourNameToGetStarted")}:
            </p>
            <NameForm onSubmit={onSubmit} />
        </MainLayout>
    )
}
