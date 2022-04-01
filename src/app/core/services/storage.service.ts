import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession : ISession | null = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(token: ISession): void {
    this.currentSession = token;
    this.localStorageService.setItem('token', JSON.stringify(this.currentSession));
  }

  loadSessionData(): ISession | null {
    var sessionStr = this.localStorageService.getItem('token');

    if(sessionStr) { 
      return JSON.parse(sessionStr);
    }

    return null;
  }

  getCurrentSession(): ISession | null {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('token');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string | null {
    var session = this.getCurrentSession();

    if(session && session.token) {
      return session.token;
    }

    return null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
