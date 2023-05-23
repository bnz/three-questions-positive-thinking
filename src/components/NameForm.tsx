import type { FC } from "react"
import { i18n } from "../utils/i18n"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import { cx } from "../utils/cx"

interface NameFormProps {
    value?: string

    onSubmit(name: string): void
}

export const NameForm: FC<NameFormProps> = ({ onSubmit, value }) => {
    const edit = value !== undefined

    const [name, setName] = useState(value || "")
    const [valid, setValid] = useState(false)

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(name)
    }, [name, onSubmit])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const res = /^.{3,}$/.test(name)
        setValid(res)
        setName(name)
    }, [setName, setValid])

    return (
        <form
            className={cx("flex gap-5", edit ? "flex-row w-full" : "flex-col mx-auto max-w-xs")}
            onSubmit={submit}
        >
            <input
                type="text"
                placeholder={i18n("minThreeLetters")}
                autoFocus
                className={cx(edit ? "w-full" : "text-center")}
                value={name}
                onChange={onChange}
            />
            <button type="submit" disabled={!valid} className={cx(!edit && "self-center")}>
                {edit ? i18n("save") : i18n("start")}
            </button>
        </form>
    )
}
