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

export const getMonth = (date: string) =>
    new Intl
        .DateTimeFormat(map[lang], { month: "long" })
        .format(new Date(date))

export const getYear = (date: string) =>
    new Intl
        .DateTimeFormat(map[lang], { year: "numeric" })
        .format(new Date(date))

export const currentTime = () => {
    const [hh, mm] = getCurrentDateTime()
        .split("T")[1]
        .split(".")[0]
        .split(":")

    return [hh, mm].join(":")
}

export const formatToHuman = (date: string, showMonth = true): string => {
    const [, month, day] = date.split("-")
    const res = [
        day.match(/^([0-9])/ig)?.[0] === "0" ? day.substring(1) : day,
    ]
    if (showMonth) {
        res.push(getMonthName(Number(month)))
    }
    return res.join(" ")
}

export const getMissingDates = (array: any[]) => array
    .sort((a, b) => Date.parse(a) - Date.parse(b))
    .reduce((hash => (p: string[], c) => {
        const missingDaysNo = (Date.parse(c) - hash.prev) / (1000 * 3600 * 24)
        if (hash.prev && missingDaysNo > 1) {
            for (let i = 1; i < missingDaysNo; i++) {
                p.push(
                    (new Date(hash.prev + i * (1000 * 3600 * 24))).toISOString().split("T")[0],
                )
            }
        }
        hash.prev = Date.parse(c)
        return p
    })(Object.create(null)), [])
