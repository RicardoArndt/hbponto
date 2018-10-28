import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";

@Injectable()
export class JiraProjectService {
    private _routeApi: BaseRoute = new BaseRoute();

    constructor(private _http: HttpClient) { }

    getAllProjects(): Observable<any> {
        return this._http.get(this._routeApi.GetAllProjects);
    }

    getSprints(id: number): Observable<any> {
        return this._http.get(this._routeApi.GetSprints + id);
    }
}