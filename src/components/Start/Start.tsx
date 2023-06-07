import type { FC } from "react"
import { MainLayout } from "../MainLayout"
import { Greeting } from "./Greeting"
import { todayDate } from "../../utils/todayDate"
import { useData } from "../../DataContext"
import { ViewHistoryButton } from "./ViewHistoryButton"
import { TodayScreen } from "./TodayScreen"
import { Heading } from "./Heading"
import { Questionnaire } from "../Questionnaire"

const useIsToday = () => {
    const { state: { history } } = useData()
    const today = todayDate()

    return history.find(({ date }) => date === today) !== undefined
}

export const Start: FC = () => (
    <MainLayout header={<Greeting />}>
        <Heading />
        {useIsToday() ? <TodayScreen /> : <Questionnaire />}
        <ViewHistoryButton />
    </MainLayout>
)
