import type { FC } from "react"
import { create } from "../utils/localStorage"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"
import { NameForm } from "./NameForm"
import { useData } from "../App"

export const Welcome: FC = () => {
    const { setData } = useData()

    return (
        <MainLayout header={i18n("hello")}>
            <div className="my-10 w-32 h-32 mx-auto bg-no-repeat bg-[url('./assets/hug.svg')]" />
            <p className="text-center mb-5">
                {i18n("enterYourNameToGetStarted")}:
            </p>
            <NameForm onSubmit={(name) => setData(create(name))} />
        </MainLayout>
    )
}
