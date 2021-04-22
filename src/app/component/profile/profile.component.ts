import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private logService: LoginService) { }

  username : string;
  ngOnInit(): void {
    this.username = this.logService.currentUsername;
  }


}
