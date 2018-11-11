import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { Observable } from "rxjs";

@Injectable()
export class RelatoryService {

    private route = new BaseRoute();

    constructor(private _http: HttpClient) { }

    getAllRelatories(): Observable<any> {
        return this._http.get(this.route.Relatories);
    }
}