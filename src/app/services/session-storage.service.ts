import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  async getUsername(): Promise<string | null> {
    return new Promise((resolve) => {
      const username = sessionStorage.getItem('username');
      resolve(username);
    });
  }

  async getUserId(): Promise<string | null> {
    return new Promise((resolve) => {
      const id = sessionStorage.getItem('userId');
      resolve(id );
    });

  }
}
