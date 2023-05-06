import { Lang, lang } from "./i18n"

const map: Record<Lang, string> = {
    ru: "ru-RU",
}

const getMonthName = (monthNumber: number): string => {
    const date = new Date()
    date.setMonth(monthNumber - 1)
    return date.toLocaleString(map[lang], { month: "short" })
}

export const todayDate = (humanFormat?: boolean): string => {
    const date = new Date().toISOString().split("T")[0]
    if (humanFormat) {
        return formatToHuman(date)
    }
    return date
}

export const formatToHuman = (date: string): string => {
    const [year, month, day] = date.split("-")
    return [
        day.match(/^([0-9])/ig)?.[0] === "0" ? day.substring(1) : day,
        getMonthName(Number(month)),
        // year,
    ].join(" ")
}
