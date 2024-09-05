import { Data } from "./DataContext"
import { clear, create, Page, update } from "./utils/localStorage"
import { generateRandom, randomIntFromInterval } from "./utils/randomIntFromInterval"
import { currentTime, todayDate } from "./utils/todayDate"

export enum ActionType {
    GO_TO_PAGE = "GO_TO_PAGE",
    CREATE = "CREATE",
    QUESTIONNAIRE_INIT = "QUESTIONNAIRE_INIT",
    QUESTIONNAIRE_RESET = "QUESTIONNAIRE_RESET",
    QUESTIONNAIRE_UPDATE = "QUESTIONNAIRE_UPDATE",
    HISTORY_PUSH = "HISTORY_PUSH",
    UPDATE_NAME = "UPDATE_NAME",
    DELETE_ALL = "DELETE_ALL",
}

interface GenAction<T = ActionType, P = undefined> {
    type: T
    payload: P
}

export type Actions =
    | GenAction<ActionType.GO_TO_PAGE, { page: Page }>
    | GenAction<ActionType.CREATE, { name: string }>
    | GenAction<ActionType.QUESTIONNAIRE_INIT>
    | GenAction<ActionType.QUESTIONNAIRE_RESET>
    | GenAction<ActionType.QUESTIONNAIRE_UPDATE>
    | GenAction<ActionType.HISTORY_PUSH>
    | GenAction<ActionType.UPDATE_NAME, { name: string }>
    | GenAction<ActionType.DELETE_ALL>

export function mainReducer(state: Data, { type, payload }: Actions): Data {
    switch (type) {

        case ActionType.CREATE:
            return create(payload.name)

        case ActionType.QUESTIONNAIRE_INIT: {
            const index = randomIntFromInterval(0, 2)
            return update({
                questionnaire: [
                    { index, answer: null },
                ],
            })
        }

        case ActionType.QUESTIONNAIRE_UPDATE: {
            const index = generateRandom(state.questionnaire.map(({ index }) => index))
            return update({
                questionnaire: [
                    ...state.questionnaire,
                    { index, answer: null },
                ],
            })
        }

        case ActionType.QUESTIONNAIRE_RESET:
            return update({ questionnaire: [] })

        case ActionType.HISTORY_PUSH:
            return update({
                page: Page.START,
                questionnaire: [],
                history: [
                    ...state.history,
                    {
                        date: todayDate(),
                        time: currentTime(),
                        answers: state.questionnaire,
                    },
                ],
            })

        case ActionType.UPDATE_NAME:
            return update({
                ...state,
                name: payload.name,
                page: Page.START,
            })

        case ActionType.GO_TO_PAGE:
            return update({ page: payload.page })

        case ActionType.DELETE_ALL:
            clear()
            window.location.reload()
            return state

        default:
            return state
    }
}
