import { Injectable } from "@angular/core";
import { ToastController, Toast } from "ionic-angular";

@Injectable()
export class ToastHandler { 
    constructor(private _tcontroller: ToastController) { }

    handlerToast(errorHandler: string): Toast {
        var toast = this._tcontroller.create({
            message: errorHandler,
            duration: 2000,
            position: 'top'
        });

        return toast;
    }
}