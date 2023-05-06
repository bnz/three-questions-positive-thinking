import type { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react"
import { useCallback, useState } from "react"
import { create } from "../utils/localStorage"
import { Data } from "../App"
import { MainLayout } from "./MainLayout"
import { i18n } from "../utils/i18n"

interface StartFormProps {
    setData: Dispatch<SetStateAction<null | Data>>
}

export const StartForm: FC<StartFormProps> = ({ setData }) => {
    const [name, setName] = useState("")
    const [valid, setValid] = useState(false)

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const res = /^.{3,}$/.test(name)
        setValid(res)
        setName(name)
    }, [setName, setValid])

    const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData(create(name))
    }, [name, setData])

    return (
        <MainLayout header={i18n("hello")}>
            <div className="my-10 w-32 h-32 mx-auto bg-no-repeat bg-[url('./assets/hug.svg')]" />
            <p className="text-center mb-5">
                {i18n("enterYourNameToGetStarted")}:
            </p>
            <form className="text-center max-w-xs mx-auto" onSubmit={submit}>
                <input
                    type="text"
                    placeholder={i18n("minThreeLetters")}
                    autoFocus
                    className="block w-full mb-10 text-center"
                    value={name}
                    onChange={onChange}
                />
                <button type="submit" disabled={!valid}>
                    {i18n("start")}
                </button>
            </form>
        </MainLayout>
    )
}
