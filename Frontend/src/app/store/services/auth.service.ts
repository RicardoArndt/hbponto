import { Injectable } from "@angular/core";
import { AuthUser } from "../../models/auth-user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRoute } from "./routes/base";

@Injectable()
export class AuthService {
    private _routeApi: BaseRoute = new BaseRoute();

    constructor(private _http: HttpClient) { }

    login(data: AuthUser): Observable<any> {
        return this._http.post(this._routeApi.Authentication, data);
    }

    validateAuthorization(): Observable<any> {
        return this._http.get(this._routeApi.Authentication);
    }

    getCurrentUser() {
        return this._http.get(this._routeApi.Users + 'current');
    }
}
