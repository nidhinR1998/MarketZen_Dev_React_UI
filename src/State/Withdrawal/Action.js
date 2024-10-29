import { type } from "os"
import { WITHDRAWAL_REQUEST } from "./ActionType"

export const withdrawalRequest = ({amount, jwt}) => async dispatch => {
    dispatch({ type: WITHDRAWAL_REQUEST });
}