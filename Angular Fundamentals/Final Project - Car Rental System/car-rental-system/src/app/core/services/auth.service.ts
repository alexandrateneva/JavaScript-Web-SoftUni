import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SigninModel } from '../models/authentication/signin.model';
import { SignupModel } from '../models/authentication/signup.model';
import { UserModel } from '../models/authentication/user.model';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const getUserByIdUrl = `https://baas.kinvey.com/user/${appKey}/`

@Injectable()
export class AuthService {

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

    isAdmin(): boolean {
        let id = localStorage.getItem('id');
        let username = localStorage.getItem('username');
        return id === '' && username === '';
    }

    getUserById(id: string) {
        return this.http.get<UserModel>(getUserByIdUrl + id);
    }
}
