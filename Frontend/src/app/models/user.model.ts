export class User {
    constructor(public Id: string, 
                public UserName: string, 
                public Role: string) {}
}

export class Role {
    Key: number;
    Value: string;
}