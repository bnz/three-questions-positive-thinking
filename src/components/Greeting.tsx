import type { FC } from "react"
import { i18n, SomeKeys } from "../utils/i18n"

interface GreetingProps {
    name: string
}

const welcomeTypes: SomeKeys[] = [
    "goodMorning",
    "goodAfternoon",
    "goodEvening",
]

export const Greeting: FC<GreetingProps> = ({ name }) => {
    const hour = new Date().getHours()
    const welcomeText = welcomeTypes[hour < 12 ? 0 : hour < 18 ? 1 : 2]

    return (
        <>{i18n(welcomeText)}, {name}</>
    )
}
