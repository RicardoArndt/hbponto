import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { User } from "../../models/user.model";
import { BaseService } from "./base.service";

@Injectable()
export class UserService extends BaseService<any> {

    constructor(protected _http: HttpClient) {
        super(_http);
    }

    getAllUsers() {
        return this.doGet(BaseRoute.Users);
    }

    getAllRoles() {
        return this.doGet(BaseRoute.Roles);
    }

    updateUser(userUpdate: User) {
        return this.doPut(BaseRoute.Users, userUpdate);
    }
}