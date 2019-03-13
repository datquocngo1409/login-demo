import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from './account';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_URL = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) {
  }

  getAccount(count = 1000): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getAccountById(id: number): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.API_URL}/${id}`);
  }
  createAccount(account: Partial<IAccount>): Observable<IAccount> {
    return this.http.post<IAccount>(this.API_URL, account);
  }
  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updatePost(account: IAccount): Observable<IAccount> {
    return this.http.patch<IAccount>(`${this.API_URL}/${account.id}`, account);
  }
}
