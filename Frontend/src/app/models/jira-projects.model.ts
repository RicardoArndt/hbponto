import { DateTime } from "ionic-angular";

//#region Boards
export class ProjectsResponse {
    values: ProjectValues[];
}

export class ProjectValues {
    id: number;
    self: string;
    name: string;
    type: string;
}
//#endregion

//#region Sprints
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
//#endregion

//#region Issues
export class IssuesReponse {
    issues: Issues[];
}

export class Issues {
    id: number;
    self: string;
    key: string;
    fields: IssueFields;
}

export class IssueFields {
    key: string;
    epic: IssueEpic;
    summary: string;
    reporter: Reporter;
    status: IssueStatus;
    totalTime: string;
    timetracking: JiraIssueTimeTracking;
}

export class IssueEpic {
    key: string;
    name: string;
}

export class Reporter {
    displayname: string;
    name: string;
}

export class IssueStatus {
    id: number;
    name: string;
    description: string;
}

export class IssueSubTasks {
    id: number;
    self: string;
    key: string;
    fields: IssueFields;
}

export class IssueWorklog {
    total: number;
    worklogs: IssueWorklogs[];
}

export class IssueType {
    name: string;
    subtask: boolean;
}

export class IssueLinks {
    type: IssueLinksType;
    outwardissue: OutwardIssue
}

export class IssueWorklogs {
    timeSpentSeconds: number;
    timeSpent: string;
    started: DateTime;
    author: Author;
}

export class IssueLinksType {
    name: string;
}

export class OutwardIssue {
    key: string;
    fields: OutwardIssueFields;
}

export class OutwardIssueFields {
    summary: string;
    status: IssueStatus;
}

export class Author {
    self: string;
    name: string;
    displayName: string;
    active: boolean;
}

export class JiraIssueTimeTracking {
    originalEstimate: string;
    remainingEstimate: string;
    timeSpent: string;
}
//#endregion