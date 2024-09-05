import { useMemo } from "react"
import { useData } from "../../DataContext"
import { i18n } from "../../utils/i18n"
import { getMissingDates, todayDate } from "../../utils/todayDate"

export function Heading() {
    const { state: { history } } = useData()

    const [daysDifference] = useMemo(() => {
        if (history.length <= 0) {
            return [0, 0]
        }
        const arr = history.map(({ date }) => date)
        const today = todayDate()
        const missed = getMissingDates([...arr, today]).length - 1 // minus today
        const [{ date: firstDate }] = history.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        const date1 = new Date(today) as any
        const date2 = new Date(firstDate) as any
        const totalSeconds = Math.abs(date2 - date1) / 1000
        const diff = Math.floor(totalSeconds / (60 * 60 * 24))

        return [diff, missed]
    }, [history])

    return (
        <div className="mx-auto text-center mt-5 mb-10">
            {[
                i18n("todayIsNDay").replace("###", `${daysDifference === 0 ? 1 : daysDifference}`),
                todayDate(true),
            ].join(", ")}
        </div>
    )
}
