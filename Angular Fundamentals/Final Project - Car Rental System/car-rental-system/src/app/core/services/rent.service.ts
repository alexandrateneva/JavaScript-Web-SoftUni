import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateRentModel } from '../models/cars/create-rent.model';
import { RentModel } from '../models/cars/rent.model';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

const createRentUrl = `https://baas.kinvey.com/appdata/${appKey}/rents`;
const getAllRentsUrl = `https://baas.kinvey.com/appdata/${appKey}/rents?query={}&sort={"_kmd.ect": -1}`;
const getAllRentsForAdminUrl = `https://baas.kinvey.com/appdata/${appKey}/rents?query={"visibleToAdmin":true}&sort={"_kmd.ect": -1}`;
const currentRentUrl = `https://baas.kinvey.com/appdata/${appKey}/rents/`;
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

    getAllForAdmin() {
        return this.http.get<RentModel[]>(getAllRentsForAdminUrl);
    }

    delete(id: string) {
        return this.http.delete(currentRentUrl + id);
    }

    hide(id: string, rentModel: RentModel, entity: 'user' | 'admin') {
        if (entity === 'user') {
            rentModel.visibleToUser = false;
        } else {
            rentModel.visibleToAdmin = false;
        }

        if (rentModel.visibleToAdmin === false && rentModel.visibleToUser === false) {
            return this.delete(id);
        }
        return this.http.put(currentRentUrl + id, rentModel);
    }

    reject(id: string, rentModel: RentModel) {
        rentModel.isRejected = !rentModel.isRejected;
        return this.http.put(currentRentUrl + id, rentModel);
    }

    getByCarId(carId: string) {
        let end = `{"isRejected":false,"car.id":"${carId}"}&sort={"startDate": -1}`;
        return this.http.get<RentModel[]>(getByQueryUrl + end);
    }

    getByUserId(userId: string) {
        let end = `{"visibleToUser":true,"user.id":"${userId}"}&sort={"startDate": -1}`;
        return this.http.get<RentModel[]>(getByQueryUrl + end);
    }
}