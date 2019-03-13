import {Component, OnInit} from '@angular/core';
import {IAccount} from '../account';
import {FormGroup} from '@angular/forms';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accountlist: IAccount[] = [];
  usernameLogin = '';
  passwordLogin = '';
  logined: boolean;
  public currenAccount: IAccount;
  linkHome = '';
  finishLogin = false;
  click = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAccount().subscribe(next => (this.accountlist = next), error1 => (this.accountlist = []));
  }

  login() {
    this.logined = false;
    this.click = true;
    let account: IAccount;
    for (account of this.accountlist) {
      if (account.username === this.usernameLogin && account.password === this.passwordLogin) {
        this.logined = !this.logined;
        this.currenAccount = new class implements IAccount {
          email: string = account.email;
          id: number = account.id;
          password: string = account.password;
          phoneNumber: string = account.phoneNumber;
          username: string = account.username;
        };
        this.linkHome = '/home/' + this.currenAccount.id;
      }
    }
  }
}
