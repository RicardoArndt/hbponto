import { ErrorHandler, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastHandler } from "../toast/toast-handler";

export class AppErrorHandler implements ErrorHandler {
    private _toastHandler: ToastHandler;

    constructor(@Inject(ToastHandler) toastHandler: ToastHandler) {
        this._toastHandler = toastHandler;
     }

    handleError(error: Error | HttpErrorResponse) {
        if(error instanceof HttpErrorResponse) {
            switch(error.status) {
                case 404: this._toastHandler.handlerToast("Página web não encontrada").present();
                case 401: this._toastHandler.handlerToast("Usuário não autenticado").present();
            }
        }
    }
}