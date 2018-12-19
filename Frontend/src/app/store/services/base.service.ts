import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ENV } from "../../../environments/environment"; 

@Injectable()
export class BaseService<T> {
    constructor(protected _http: HttpClient) { }

    protected doPost(route: string, data: T): Observable<T> {
        var hasRequest = false;
        var result = Observable.of<T>();

        ENV.API.forEach(api => {
            if (!hasRequest) {
                if(this.UrlIsOnline(api + "authentication/")) {
                    hasRequest = true;
                    result = this._http.post<T>(api + route, data);
                }
            }
        });
        return result;
    }

    protected doPut(route: string, data: T): Observable<T> {
        var hasRequest = false;
        var result = Observable.of<T>();

        ENV.API.forEach(api => {
            if (!hasRequest) {
                if(this.UrlIsOnline(api + "authentication/")) {
                    hasRequest = true;
                    result = this._http.put<T>(api + route, data);
                }
            }
        });
        return result;
    }

    protected doGet(route: string): Observable<T> {
        var hasRequest = false;
        var result  = Observable.of<T>();

        ENV.API.forEach(api => {
            if (!hasRequest) {
                if(this.UrlIsOnline(api + "authentication/")) {
                    hasRequest = true;
                    result = this._http.get<T>(api + route);
                }
            }
        });
        return result;
    }

    private UrlIsOnline(url: string): boolean {
        let result: number;

        this._http.get(url + 'online', { observe: 'response' }).subscribe(t => result = t.status);

        return result != 404;
    }
}