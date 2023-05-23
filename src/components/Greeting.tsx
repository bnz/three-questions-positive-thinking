import type { MouseEvent, FC, } from "react"
import { i18n, SomeKeys } from "../utils/i18n"
import { useCallback } from "react"
import { useData } from "../App"

interface GreetingProps {
    name: string
}

const welcomeTypes: SomeKeys[] = [
    "goodMorning",
    "goodAfternoon",
    "goodEvening",
]

export const Greeting: FC<GreetingProps> = ({ name }) => {
    const { goTo } = useData()
    const hour = new Date().getHours()
    const welcomeText = welcomeTypes[hour < 12 ? 0 : hour < 18 ? 1 : 2]

    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        goTo("userSettings")
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
