import { Injectable } from "@angular/core";
import { AuthUser } from "../../models/auth-user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRoute } from "./routes/base";
import { BaseService } from "./base.service";

@Injectable()
export class AuthService extends BaseService<AuthUser> {
    constructor(private _http: HttpClient) { 
        super(_http);
    }

    login(data: AuthUser): Observable<AuthUser> {
        return super.doPost(BaseRoute.Authentication, data);
    }

    validateAuthorization(): Observable<any> {
        return this._http.get(BaseRoute.Users + 'current');
    }

    getCurrentUser() {
        return this._http.get(BaseRoute.Users + 'current');
    }
}
