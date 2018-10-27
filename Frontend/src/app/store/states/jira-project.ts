export interface JiraProjectState {
    Id: number;
    Name: string;
}

export const INITIAL_STATE: JiraProjectState = {
    Id: null,
    Name: "",
}
