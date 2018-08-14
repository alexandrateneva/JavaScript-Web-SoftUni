import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SigninModel } from '../models/authentication/signin.model';
import { SignupModel } from '../models/authentication/signup.model';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {
    private currentAuthtoken: string;

    constructor(private http: HttpClient) { }

    login(signinModel: SigninModel) {
        return this.http.post(loginUrl, JSON.stringify(signinModel))
    }

    register(signupModel: SignupModel) {
        return this.http.post(registerUrl, JSON.stringify(signupModel))
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }
}