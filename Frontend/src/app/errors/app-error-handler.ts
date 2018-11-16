import { ErrorHandler, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastHandler } from "../toast/toast-handler";
import { LoginPage } from "../../pages/login/login";
import { HomePage } from "../../pages/home/home";

export class AppErrorHandler implements ErrorHandler {
    private _toastHandler: ToastHandler;

    constructor(@Inject(ToastHandler) toastHandler: ToastHandler) {
        this._toastHandler = toastHandler;
     }

    handleError(error: Error | HttpErrorResponse) {
        if(error instanceof HttpErrorResponse) {
            var errorMessage = error.error;

            switch(error.status) {
                case 400: {
                    this._toastHandler.handlerToast(errorMessage).present();
                    break;
                }
                case 401: {
                    this._toastHandler.handlerToast("Acesso não permitido").present();
                    break;
                }
                case 403: {
                    this._toastHandler.handlerToast("Acesso não permitido").present();
                    break;
                }
                case 404: {
                    this._toastHandler.handlerToast("Página não encontrada").present();
                    break;
                }
            }
        }
    }
}