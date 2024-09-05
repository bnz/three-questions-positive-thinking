import type { PropsWithChildren, ReactNode } from "react"
import { useLayoutEffect } from "react"
import { i18n } from "../utils/i18n"

const themeColorMeta = document.querySelector("[name=\"theme-color\"]")

interface MainLayoutProps {
    header: ReactNode
    headerBlur?: boolean
    goBackTo?(): void
    headerChildren?: ReactNode
}

export const MainLayout = ({
    children,
    header,
    goBackTo,
    headerBlur,
    headerChildren,
}: PropsWithChildren<MainLayoutProps>) => {

    useLayoutEffect(function () {
        function fn({ matches }: { matches: boolean }): void {
            if (matches) {
                document.documentElement.classList.add("dark")
                themeColorMeta?.setAttribute("content", "#000")
            } else {
                document.documentElement.classList.remove("dark")
                themeColorMeta?.setAttribute("content", "#fff")
            }
        }

        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        mql.addEventListener("change", fn)
        fn({ matches: mql.matches })
    }, [])

    return (
        <>
            <main className="main">
                <header className="header">
                    {i18n("threeQuestionsEveryDay")}
                </header>
                <section className={`content${headerBlur ? " headerBlur" : ""}`}>
                    <header>
                        <h3>{header}</h3>
                        {goBackTo && (
                            <button className="back-button" onClick={goBackTo} />
                        )}
                        {headerChildren}
                    </header>
                    {children}
                </section>
            </main>
            <footer className="footer">
                2024 &copy; bonez
            </footer>
        </>
    )
}
