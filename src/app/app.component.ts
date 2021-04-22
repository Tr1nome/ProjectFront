import { Component } from '@angular/core';
import { Globals } from './globals';
import { User } from './class/user';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = Globals.APP_NAME;
  user: User|null;
  constructor(private auth:LoginService) { }
  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }
}
