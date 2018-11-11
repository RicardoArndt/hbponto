export class AuthUser {
    UserName: string;
    Password: string;
}

export class AuthUserResponse {
    Error?: string;

    constructor(public username?: string, public authJiraToken?: string, public token?: string, public userId?: string) { }
}