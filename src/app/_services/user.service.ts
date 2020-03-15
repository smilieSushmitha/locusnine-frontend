import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../_models/user.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  STATUS_MAP: any[];
  constructor(private http: HttpClient) {
    this.STATUS_MAP = [{
      state: 'Active',
      icon: 'ico_active.svg'
    }, {
      state: 'Inactive',
      icon: 'ico_inactive.svg'
    }, {
      state: 'Pending',
      icon: 'ico_pending.svg'
    }];
  }

  getUsers() {
    return this.http.get(environment.API_USER)
      .pipe(map((res: any) => {
        return res.users.map(user => {
          const randomIndex = this.getRandomArbitrary();
          user['status'] = this.STATUS_MAP[randomIndex].state;
          user['statusIcon'] = this.STATUS_MAP[randomIndex].icon;
          return user;
        });
      }));
  }

  getUser(userId: string) {
    return this.http.get(environment.API_USER + userId)
      .pipe(map((res: any) => res.user));
  }

  createUser(user: UserModel) {
    return this.http.post(environment.API_USER, user);
  }

  editUser(userId: string, user: UserModel) {
    return this.http.put(environment.API_USER + userId, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.API_USER + userId);
  }

  // Helper Function
  getRandomArbitrary() {
    const min = 0;
    const max = 2;
    return Math.round(Math.random() * (max - min) + min);
  }
}
