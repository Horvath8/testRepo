import { Injectable } from '@angular/core';
import {Dexie} from 'dexie';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie{
  users!: Dexie.Table<User,string>;

  constructor() {
    super('user-db');
    this.version(1).stores({
      users: 'id,firstname,lastname,username,password,salary,age'
    });
  }

}
