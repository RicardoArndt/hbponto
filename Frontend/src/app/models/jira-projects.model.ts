import { DateTime } from "ionic-angular";

export class ProjectsResponse {
    values: ProjectValues[];
}

export class ProjectValues {
    id: number;
    self: string;
    name: string;
    type: string;
}

export class SprintsResponse {
    values: SprintValues[];
}

export class SprintValues {
    id: number;
    self: string;
    state: string;
    name: string;
    startDate: DateTime;
    endDate: DateTime;
    completeDate: DateTime;
    originBoardId: number;
}