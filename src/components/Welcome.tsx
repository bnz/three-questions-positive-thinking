import type { FC } from "react"
import { useCallback } from "react"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"
import { NameForm } from "./NameForm"
import { useData } from "../DataContext"
import { ActionType } from "../mainReducer"

export const Welcome: FC = () => {
    const { dispatch } = useData()
    const onSubmit = useCallback((name: string) => {
        dispatch({ type: ActionType.CREATE, payload: { name } })
    }, [dispatch])

    return (
        <MainLayout header={i18n("hello")}>
            <div className="hug-image" />
            <p className="text-center mb-5">
                {i18n("enterYourNameToGetStarted")}:
            </p>
            <NameForm onSubmit={onSubmit} />
        </MainLayout>
    )
}
