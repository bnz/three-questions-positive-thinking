import type { MouseEvent } from "react"
import { useCallback } from "react"
import { i18n, SomeKeys } from "../../utils/i18n"
import { useData } from "../../DataContext"
import { Page } from "../../utils/localStorage"

const welcomeTypes: SomeKeys[] = [
    "goodMorning",
    "goodAfternoon",
    "goodEvening",
]

export function Greeting() {
    const { state: { name }, goTo } = useData()
    const hour = new Date().getHours()
    const welcomeText = welcomeTypes[hour < 12 ? 0 : hour < 18 ? 1 : 2]

    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        goTo(Page.USER_SETTINGS)()
    }, [goTo])

    return (
        <>
            {i18n(welcomeText)},
            <button onClick={onClick} className="greeting-button">
                {name}
                <span className="gear-icon" />
            </button>
        </>
    )
}
