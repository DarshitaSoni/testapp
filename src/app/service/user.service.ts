import { User } from 'src/app/model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** server url */
  public url: string = 'https://stark-tor-97095.herokuapp.com/api/v1/users/';

  constructor(private http: HttpClient) { }

  /** method shows listing of users */
  public listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?page=1`);
  }

  /** method shows user by id */
  public getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.url}${id}`,);
  }

  /** method to add new user */
  public addUser(item): Observable<User> {
    return this.http.post<User>(`${this.url}`, item);
  }

  /** method to delete the user */
  public deleteUser(id): Observable<User> {
    return this.http.delete<User>(`${this.url}${id}`,);
  }

  /** method to editUser */
  public editUser(item): Observable<User> {
    return this.http.put<User>(`${this.url}${item.id}`, item);
  }
}
