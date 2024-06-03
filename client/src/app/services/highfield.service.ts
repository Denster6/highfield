import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUserData } from '../models/userdata'

@Injectable({
    providedIn: 'root'
})

export class HighfieldService{
    //private apiUrl: string = 'https://recruitment.highfieldqualifications.com/api/test';
   // private apiUrl: string = '/clientdata.json';
    private apiUrl: string = 'http://localhost:7070/users';

    constructor(
        private http: HttpClient)
        {

        }

    async getData(): Promise<IUserData[] | undefined>{
       return await lastValueFrom(this.http.get<IUserData[]>(this.apiUrl));
    }
}