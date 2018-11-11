export class User {
    constructor(public Id: string, 
                public UserName: string, 
                public Role: string) {}
}

export class CurrentUser {
    public name: string;
    public emailAddress: string;
    public displayName: string;
    public avatarUrl: string;
}

export class Role {
    Key: number;
    Value: string;
}