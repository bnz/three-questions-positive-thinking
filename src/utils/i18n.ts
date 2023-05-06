import ru from "./langs/ru.json"

const langKey = "lang"

export type Lang = "ru"

export let lang: Lang = "ru"

try {
    const data = localStorage.getItem(langKey)
    if (data !== null) {
        lang = JSON.parse(data)
    }
} catch (e) {
    lang = "ru"
}

type Keys = keyof typeof ru

export type SomeKeys = Partial<Keys>

const map: Record<Lang, Record<Keys, string>> = { ru }

export const i18n = (key: Keys): string => map[lang][key] || key
