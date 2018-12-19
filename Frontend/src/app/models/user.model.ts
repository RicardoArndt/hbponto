export class User {
    constructor(public Id: string, 
                public UserName: string, 
                public Role: string) {}
}

export class CurrentUser {
    constructor(
        public name?: string,
        public emailAddress?: string,
        public displayName?: string,
        public avatarUrl?: string) { }

    public static CreateInstance(name: string, email: string, displayName: string, avatarUrl: string) {
        return new CurrentUser(name, email, displayName, avatarUrl);
    }
}

export class Role {
    Key: number;
    Value: string;
}