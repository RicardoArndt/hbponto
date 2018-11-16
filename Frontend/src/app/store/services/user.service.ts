import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { User } from "../../models/user.model";

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) {}

    getAllUsers() {
        return this._http.get(BaseRoute.Users);
    }

    getAllRoles() {
        return this._http.get(BaseRoute.Roles);
    }

    updateUser(userUpdate: User) {
        return this._http.put(BaseRoute.Users, userUpdate);
    }
}