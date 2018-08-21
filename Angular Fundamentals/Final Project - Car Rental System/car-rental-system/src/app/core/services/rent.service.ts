import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateRentModel } from '../models/cars/create-rent.model';
import { RentModel } from '../models/cars/rent.model';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

const createRentUrl = `https://baas.kinvey.com/appdata/${appKey}/rents`;
const getAllRentsUrl = `https://baas.kinvey.com/appdata/${appKey}/rents?query={}&sort={"_kmd.ect": -1}`;
const deleteRentUrl = `https://baas.kinvey.com/appdata/${appKey}/rents/`;
const getByQueryUrl = `https://baas.kinvey.com/appdata/${appKey}/rents?query=`;

@Injectable()
export class RentService {
    constructor(private http: HttpClient) { }

    create(rentModel: CreateRentModel) {
        return this.http.post(createRentUrl, JSON.stringify(rentModel))
    }

    getAll() {
        return this.http.get<RentModel[]>(getAllRentsUrl);
    }

    delete(id: string) {
        return this.http.delete(deleteRentUrl + id);
    }

    getByCarId(carId: string) {
        let end = `{"car.id":"${carId}"}&sort={"startDate": -1}`;
        return this.http.get<RentModel[]>(getByQueryUrl + end);
    }

    getByUserId(userId : string) {
        let end = `{"user.id":"${userId}"}&sort={"startDate": -1}`;
        return this.http.get<RentModel[]>(getByQueryUrl + end);
    }
}