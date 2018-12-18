import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENV } from "../../../environments/environment"; 

@Injectable()
export class BaseService<T> {
    constructor(private _http: HttpClient) { }

    protected doPost(route: string, data: T): Observable<T> {
        var hasRequest = false;

        ENV.API.forEach(api => {
            if (this.UrlIsOnline(api) && !hasRequest) {
                hasRequest = true;
                return this._http.post<T>(api + route, data);
            }
        });
        return Observable.of();
    }

    protected doPut() {

    }


    private UrlIsOnline(url: string): boolean {
        let result;

        this._http.head(url + 'online', { observe: 'response' }).subscribe(t => result = t.status == 200);

        return result;
    }
    protected doGet(route: string): Observable<T> {
        return this._http.get<T>(route);
    }
}