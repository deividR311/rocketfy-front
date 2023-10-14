import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import HttpStatusCode from './http.status.code';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../shared/utilities/spinner.service';


@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar, private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        return next.handle(this.addSubscriptionKey(request)).pipe(
            catchError((error: HttpErrorResponse) => {
                this.spinnerService.hide();
                switch (error.status) {
                    case HttpStatusCode.INTERNAL_SERVER_ERROR:
                        this.openSnackBar('Ha ocurrido un error del servidor');
                        break;

                    case HttpStatusCode.BAD_REQUEST:
                        this.openSnackBar('Request no valido');
                        break;

                    default:
                        break;
                }

                return throwError(() => error);
            }),
            tap((res: any) => {
                this.spinnerService.hide();
                return res;
            }),
            finalize(() => {
                this.spinnerService.hide();
            })
        );
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'done', { duration: 3000 });
    }

    addSubscriptionKey(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            },
        });
    }
}
