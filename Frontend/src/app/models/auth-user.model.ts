export class AuthUser {
    UserName: string;
    Password: string;
}

export class AuthUserResponse {
    // UserName?: string;
    // Token?: string;
    // AuthJiraToken?: string;
    Error?: string;

    constructor(public username?: string, public authJiraToken?: string, public token?: string) { }
}