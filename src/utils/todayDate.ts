import { Lang, lang } from "./i18n"

const map: Record<Lang, string> = {
    ru: "ru-RU",
}

const getMonthName = (monthNumber: number): string => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString(map[lang], { month: "short" })
}

const getCurrentDateTime = () => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000 //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString()
}

export const todayDate = (humanFormat?: boolean): string => {
    const [date] = getCurrentDateTime().split("T")
    if (humanFormat) {
        return formatToHuman(date)
    }
    return date
}

export const currentDayOfWeek = (date: string) =>
    new Intl
        .DateTimeFormat(map[lang], { weekday: "short" })
        .format(new Date(date))

export const currentTime = () => {
    const [hh, mm] = getCurrentDateTime()
        .split("T")[1]
        .split(".")[0]
        .split(":")

    return [hh, mm].join(":")
}

export const formatToHuman = (date: string): string => {
    const [, month, day] = date.split("-")
    return [
        day.match(/^([0-9])/ig)?.[0] === "0" ? day.substring(1) : day,
        getMonthName(Number(month)),
    ].join(" ")
}
