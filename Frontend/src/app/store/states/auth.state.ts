export interface AuthUserState {
    UserName: string;
    Token: string;
    UserId: string;
    IsAuthenticated: boolean;
    Error?: string;
}

export const INITIAL_STATE: AuthUserState = {
    UserName: "",
    Token: "",
    UserId: "",
    IsAuthenticated: false
}
