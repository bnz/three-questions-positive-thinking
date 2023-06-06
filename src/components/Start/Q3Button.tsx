import type { FC } from "react"
import { useData } from "../../DataContext"
import { i18n } from "../../utils/i18n"
import { Page } from "../../utils/localStorage"

export const Q3Button: FC = () => (
    <button className="q3-button block mx-auto mb-10" onClick={useData().goTo(Page.QUESTIONNAIRE)}>
        {i18n("questionsForToday")}
    </button>
)
