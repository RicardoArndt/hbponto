import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap, finalize } from "rxjs/operators";
import { LocalStorageService } from "../services/local-storage.service";
import { LoadingController } from "ionic-angular";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    public isShowing: boolean = false;

    constructor(private _localStorage: LocalStorageService, private loadingCtrl: LoadingController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        let tokenJira = this._localStorage.TokenJiraAuthentication ? this._localStorage.TokenJiraAuthentication : '';
        let token = this._localStorage.TokenAuthentication ? this._localStorage.TokenAuthentication : '';
        
        if(!this.isShowing) {
            loading.present();
            this.isShowing = true;
        }
    
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
                        return res;
                    }),
                    finalize(() => {
                        loading.dismiss();
                        this.isShowing = false;
                    })
                );
    }
}

@NgModule({
    providers: [
        LocalStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})
export class HttpRequestInterceptorModule { }