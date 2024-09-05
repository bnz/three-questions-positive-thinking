import { i18n } from "../../utils/i18n"

export function TodayScreen() {
    return (
        <div className="text-center mb-10">
            <div className="mb-10">
                {i18n("thereAreNoMoreQuestionsForToday")}
                <br />
                {i18n("seeYouTomorrow")}!
            </div>
            <div className="party-image" />
        </div>
    )
}
