import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    path: string;

    constructor(readonly http: HttpClient) {
        this.path = environment.apiURL;
    }

    get(url: string): any {
        return this.http.get(`${this.path}${url}`);
    }

    post(url: string, data: any): any {
        return this.http.post(`${this.path}${url}`, data);
    }

    put(url: string, data: any): any {
        return this.http.put(`${this.path}${url}`, data);
    }

    delete(url: string, id: string | undefined) {
        return this.http.delete(`${this.path}${url}${id}`);
    }
}
