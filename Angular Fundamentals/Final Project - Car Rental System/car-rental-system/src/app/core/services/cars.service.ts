import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateCarModel } from '../models/cars/create-car.model';
import { CarModel } from '../models/cars/car.model';

const appKey = "kid_SyD_v-eLQ";
const appSecret = "805b3f15a06d4cbe979443953f831283";

const createCarUrl = `https://baas.kinvey.com/appdata/${appKey}/cars`;
const getAllCarsUrl = `https://baas.kinvey.com/appdata/${appKey}/cars?query={}&sort={"_kmd.ect": -1}`;
const currentCarUrl = `https://baas.kinvey.com/appdata/${appKey}/cars/`;

@Injectable()
export class CarsService {
    constructor(private http: HttpClient) { }

    create(carModel: CreateCarModel) {
        return this.http.post(createCarUrl, JSON.stringify(carModel))
    }

    getAll(){
        return this.http.get<CarModel[]>(getAllCarsUrl);
    }

    delete(id: string){
        return this.http.delete(currentCarUrl + id);
    }

    getDetails(id : string){
        return this.http.get<CarModel>(currentCarUrl + id);
    }
    
    edit(id : string, carModel : CarModel){
        return this.http.put(currentCarUrl + id, carModel);
    }
}