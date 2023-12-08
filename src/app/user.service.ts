import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<{ email: string, password: string }> = [];

  constructor() { }

  getUsers(): Array<{ email: string, password: string }> {
    return this.users;
  }

  getUser(email: string): any {
    return this.users.some(user => user.email === email);
  }

  addUser(email: string, password: string) {
    this.users.push({ email, password });
  }
}
