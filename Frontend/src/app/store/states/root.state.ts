import { INITIAL_STATE, AuthUserState } from "./auth.state";

export interface RootState {
    auth: AuthUserState
}

export const ROOT_STATE: RootState = {
    auth: INITIAL_STATE
}