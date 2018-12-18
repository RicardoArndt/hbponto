import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LocalStorageService } from "../services/local-storage.service";
import { LoadingHandler } from "../app/loading/loading-handler";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private _localStorage: LocalStorageService, private _loadingHandler: LoadingHandler) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const start = Date.now();
        let tokenJira = this._localStorage.TokenJiraAuthentication ? this._localStorage.TokenJiraAuthentication : '';
        let token = this._localStorage.TokenAuthentication ? this._localStorage.TokenAuthentication : '';

        let headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .set('Access-Control-Allow-Origin', 'http://localhost:8100')
            .set('Access-Control-Allow-Headers', '*')
            .set('Access-Control-Expose-Headers', '*')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Set-Cookie', tokenJira);

        const cloneReq = req.clone({ headers });

        return next.handle(cloneReq).pipe(
                    map(res => {
                        this._loadingHandler.presentLoadingDefault(Date.now() - start);
                        return res;
                    })
                );
    }
}

@NgModule({
    providers: [
        LoadingHandler,
        LocalStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})
export class HttpRequestInterceptorModule { }