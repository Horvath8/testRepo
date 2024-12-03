import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/api.response';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL:string='http://localhost:8081/users'

  constructor(private http: HttpClient,) { }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.baseURL);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.baseURL, user);
  }

}
