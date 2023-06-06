import { FC, useCallback, useReducer } from "react"
import { Welcome } from "./components/Welcome"
import { get, Page } from "./utils/localStorage"
import { Start } from "./components/Start/Start"
import { Questionnaire } from "./components/Questionnaire"
import { AnswersHistory } from "./components/AnswersHistory"
import { UserSettings } from "./components/UserSettings"
import { Data, DataContext } from "./DataContext"
import { ActionType, mainReducer } from "./mainReducer"

const initialData = get()

export const App: FC = () => {
    const [state, dispatch] = useReducer(mainReducer, initialData as Data)

    const goTo = useCallback((page: Page) => () => {
        dispatch({ type: ActionType.GO_TO_PAGE, payload: { page } })
    }, [dispatch])

    return (
        <DataContext.Provider value={{ goTo, state, dispatch }}>
            {state === null ? (
                <Welcome />
            ) : {
                start: <Start />,
                questionnaire: <Questionnaire />,
                history: <AnswersHistory />,
                userSettings: <UserSettings />,
            }[state.page]}
        </DataContext.Provider>
    )
}
