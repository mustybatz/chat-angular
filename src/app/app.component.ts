import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { AuthenticationService } from './login/shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private storageService: StorageService) { }

  isLoggedIn() {
    return this.storageService.isAuthenticated();
  }

  logout() {
    this.storageService.logout();
  }

}
