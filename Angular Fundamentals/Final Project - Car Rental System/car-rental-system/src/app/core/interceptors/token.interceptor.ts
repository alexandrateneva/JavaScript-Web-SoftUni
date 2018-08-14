import {
    HttpResponse,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        }

        return next.handle(request).pipe(tap((res: any) => {

            if (res instanceof HttpResponse && res.body._kmd.authtoken) {
                let message = this.router.url.endsWith('signup')
                    ? 'Signup successful!'
                    : 'Signin successful!';
                this.saveToken(res.body);
                this.toastr.success(message, 'Success!');
                this.router.navigate(['/home']);
            }

            // if (res instanceof HttpResponse && res.status === 200 && res.url.endsWith('create')) {
            //     this.toastr.success(res.body.message, 'Success!');
            //     this.router.navigate(['/furniture/all']);
            // }

        }))
    }

    private saveToken(data) {
        localStorage.setItem('user', data.username);
        localStorage.setItem('token', data._kmd.authtoken);
    }
}