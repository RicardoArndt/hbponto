export interface AuthUserState {
    UserName: string;
    Token: string;
    IsAuthenticated: boolean;
    Error?: string;
}

export const INITIAL_STATE: AuthUserState = {
    UserName: "",
    Token: "",
    IsAuthenticated: false
}
