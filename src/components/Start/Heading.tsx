import { FC } from "react"
import { useData } from "../../DataContext"
import { i18n } from "../../utils/i18n"
import { todayDate } from "../../utils/todayDate"

export const Heading: FC = () => {
    const { state: { history } } = useData()

    return (
        <div className="mx-auto text-center mt-5 mb-10">
            {[
                i18n("todayIsNDay").replace("###", `${history.length === 0 ? 1 : history.length}`),
                todayDate(true),
            ].join(", ")}
        </div>
    )
}
