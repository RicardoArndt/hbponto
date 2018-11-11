import { Relatory } from "../../models/relatory.model";

export interface RelatoryState {
    Relatories?: Relatory[];
}

export const RELATORY_INITIAL_STATE: RelatoryState = {
    Relatories: null
}
