import type { FC } from "react"
import { useData } from "../App"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"
import { NameForm } from "./NameForm"
import { clear, update } from "../utils/localStorage"
import { useCallback, useState } from "react"

export const UserSettings: FC = () => {
    const { data, goTo, setData } = useData()
    const onSubmit = useCallback((name: string) => {
        setData(update((oldData) => ({ ...oldData, name, })))
        goTo("start")
    }, [setData, goTo])
    const [open, setOpen] = useState(false)

    return (
        <MainLayout header={i18n("userSettings")} goBackTo={() => goTo("start")}>
            <div className="flex flex-col p-5 gap-5">
                <label>
                    {i18n("changeName")}
                    <NameForm value={data.name} onSubmit={onSubmit} />
                </label>
                <div className="text-center pt-16 pb-10">
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-900"
                        onClick={() => setOpen(true)}
                    >
                        {i18n("resetAll")}
                    </button>
                    <p className="w-2/3 mx-auto mt-5 italic text-black/50">
                        {i18n("resetAllTops").split("###").map((line, i) => (
                            <span className="block" key={i}>{line}</span>
                        ))}
                    </p>
                </div>
            </div>
            {open && (
                <div
                    className="absolute left-0 right-0 top-0 bottom-0 rounded backdrop-blur flex items-center justify-center"
                >
                    <div className="grid grid-cols-2 gap-5 p-5">
                        <p className="text-2xl col-span-2 py-5 text-center bg-white/50 rounded">
                            {i18n("areYouSure")}
                        </p>
                        <button type="button" onClick={() => setOpen(false)}>
                            {i18n("cancel")}
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-900"
                            onClick={clear}
                        >
                            {i18n("yesDeleteAll")}
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}
