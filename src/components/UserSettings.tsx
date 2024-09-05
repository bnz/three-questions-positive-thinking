import { useCallback, useState } from "react"
import { useData } from "../DataContext"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"
import { NameForm } from "./NameForm"
import { ActionType } from "../mainReducer"
import { Page } from "../utils/localStorage"
// import { UserSettingsImportExport } from "./UserSettingsImportExport"

export function UserSettings() {
    const { goTo, state: { name }, dispatch } = useData()
    const onSubmit = useCallback((name: string) => {
        dispatch({ type: ActionType.UPDATE_NAME, payload: { name } })
    }, [dispatch])
    const [open, setOpen] = useState(false)
    const doOpen = useCallback(() => setOpen(true), [setOpen])

    return (
        <MainLayout header={i18n("userSettings")} goBackTo={goTo(Page.START)}>
            <div className="flex flex-col p-5 gap-5">
                <label>
                    {i18n("changeName")}
                    <NameForm value={name} onSubmit={onSubmit} />
                </label>
                {/*<UserSettingsImportExport />*/}
                <div className="text-center pt-16 pb-10">
                    <button type="button" className="error-button" onClick={doOpen}>
                        {i18n("resetAll")}
                    </button>
                    <p className="w-2/3 mx-auto mt-5 italic text-black/50 dark:text-white/30">
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
                        <p className="text-2xl col-span-2 py-5 text-center bg-white/50 dark:bg-black/50 rounded">
                            {i18n("areYouSure")}
                        </p>
                        <button className="button" onClick={() => setOpen(false)}>
                            {i18n("cancel")}
                        </button>
                        <button
                            className="error-button"
                            onClick={() => dispatch({ type: ActionType.DELETE_ALL, payload: undefined })}
                        >
                            {i18n("yesDeleteAll")}
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}
