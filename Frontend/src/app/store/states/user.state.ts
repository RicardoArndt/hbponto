import { User } from "../../models/user.model";

export interface UserState {
    Users?: User[];
}

export const USER_INITIAL_STATE: UserState = {
    Users: null
}
