import { Injectable } from "@angular/core";
import { AuthUser } from "../../models/auth-user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRoute } from "./routes/base";
import { BaseService } from "./base.service";

@Injectable()
export class AuthService extends BaseService<any> {
    constructor(protected _http: HttpClient) { 
        super(_http);
    }

    login(data: AuthUser): Observable<any> {
        return super.doPost(BaseRoute.Authentication, data);
    }

    validateAuthorization(): Observable<any> {
        return this.doGet(BaseRoute.Authentication);
    }

    getCurrentUser() {
        return this.doGet(BaseRoute.Users + 'current');
    }
}
