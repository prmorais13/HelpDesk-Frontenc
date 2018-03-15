import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user.model';
import { HELP_DESK_API } from './helpdesk-api';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: User) {
    return this.http.post(`${HELP_DESK_API}/api/auth`, usuario);
  }

  createOrUpdate(user: User) {
    if (user.id !== null && user.id !== '') {
      return this.http.put(`${HELP_DESK_API}/api/users`, user);
    } else {
      return this.http.post(`${HELP_DESK_API}/api/users`, user);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}/api/users/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${HELP_DESK_API}/api/users/${id}`);
  }

  delete( id: string) {
    return this.http.delete(`${HELP_DESK_API}/api/users/${id}`);
  }

}
