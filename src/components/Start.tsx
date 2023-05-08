import type { FC } from "react"
import { MainLayout } from "./MainLayout"
import { Greeting } from "./Greeting"
import { todayDate } from "../utils/todayDate"
import { GoTo } from "../App"
import { i18n } from "../utils/i18n"

const fn = (count: number): string => [
    i18n("todayIsNDay").replace("###", `${count === 0 ? 1 : count}`),
    todayDate(true),
].join(", ")

export const Start: FC<GoTo> = ({ data, goTo }) => {
    const today = todayDate()
    const isToday = data.history.find(({ date }) => date === today)

    return (
        <MainLayout header={<Greeting name={data.name}/>}>
            <div className="mx-auto text-center mt-5 mb-10">
                {fn(data.history.length)}
            </div>
            {isToday ? (
                <div className="text-center mb-10">
                    <div className="mb-10">{i18n("thereAreNoMoreQuestionsForToday")}<br/>{i18n("seeYouTomorrow")}!</div>
                    <div className="bg-[url('./assets/party.svg')] bg-no-repeat bg-center bg-contain w-32 h-32 mx-auto"/>
                </div>
            ) : (
                <>
                    <div className="bg-[url('./assets/sun.svg')] bg-no-repeat bg-center bg-contain w-32 h-32 mx-auto mb-10"/>
                    <button
                        type="button"
                        className="text-3xl block mb-10 mx-auto"
                        onClick={() => goTo("questionnaire")}
                    >
                        {i18n("questionsForToday")}
                    </button>
                </>
            )}
            {data.history.length > 0 && (
                <button type="button" className="block mx-auto" onClick={() => goTo("history")}>
                    {i18n("viewTheHistoryOfResponses")}
                </button>
            )}
        </MainLayout>
    )
}
