import type { FC } from "react"
import { useData } from "../../DataContext"
import { i18n } from "../../utils/i18n"
import { Page } from "../../utils/localStorage"

export const ViewHistoryButton: FC = () => {
    const { state: { history }, goTo } = useData()

    if (history.length <= 0) {
        return null
    }

    return (
        <button className="watch-history-button" onClick={goTo(Page.HISTORY)}>
            {i18n("viewTheHistoryOfResponses")}
        </button>
    )
}
