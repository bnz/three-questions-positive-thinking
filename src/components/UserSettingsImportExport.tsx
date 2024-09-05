import { i18n } from "../utils/i18n"

export function UserSettingsImportExport() {
    return (
        <div
            className="border border-white dark:border-black rounded p-5 flex flex-col md:flex-row gap-5 bg-white/20 dark:bg-black/10">
            <button className="export-button">
                {i18n("exportData")}
            </button>
            <button className="import-button">
                {i18n("importData")}
            </button>
        </div>
    )
}
