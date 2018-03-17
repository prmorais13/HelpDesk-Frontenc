import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../model/user.model';
import { CurrentUser } from '../../../model/current-user.model';

import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new User('', '', '', '');
  shared: SharedService;
  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
  }

  login() {
    this.message = '';
    this.userService.login(this.usuario)
      .subscribe((usuarioAutenticado: CurrentUser) => {
        this.shared.token = usuarioAutenticado.token;
        this.shared.user = usuarioAutenticado.user;
        this.shared.user.profiles = usuarioAutenticado.user.profiles.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
      },
      error => {
        this.shared.token = null;
        this.shared.user = null;
        this.shared.showTemplate.emit(false);
        this.message = 'Error';
      });
  }

  cancelLogin() {
    this.usuario = new User('', '', '', '');
    this.message = '';
    // this.router.navigate(['/login']);
    window.location.href = '/login';
    window.location.reload();
  }

  
}
