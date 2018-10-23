import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class LoadingHandler {
    constructor(private loadingCtrl: LoadingController) { }

    presentLoadingDefault(timeReq: number) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, timeReq);
    }
}