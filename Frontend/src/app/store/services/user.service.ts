import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";

@Injectable()
export class UserService {
    private _routeApi: BaseRoute = new BaseRoute();

    constructor(private _http: HttpClient) {}

    getAllUsers() {
        return this._http.get(this._routeApi.Users);
    }

    getAllRoles() {
        return this._http.get(this._routeApi.Roles);
    }
}