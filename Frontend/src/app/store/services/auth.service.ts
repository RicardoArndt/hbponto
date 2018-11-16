import { Injectable } from "@angular/core";
import { AuthUser } from "../../models/auth-user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRoute } from "./routes/base";

@Injectable()
export class AuthService {
    constructor(private _http: HttpClient) { }

    login(data: AuthUser): Observable<any> {
        return this._http.post(BaseRoute.Authentication, data);
    }

    validateAuthorization(): Observable<any> {
        return this._http.get(BaseRoute.Authentication);
    }

    getCurrentUser() {
        return this._http.get(BaseRoute.Users + 'current');
    }
}
