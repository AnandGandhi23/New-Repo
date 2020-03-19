import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class ToastrNotificationService {
    constructor(private toastr: ToastrService) {}

    showError(message: string, title: string) {
        console.log("Toastr called ", title );
        this.toastr.success("abcd", title);
    }
}