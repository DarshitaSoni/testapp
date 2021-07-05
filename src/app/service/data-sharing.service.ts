import { User } from 'src/app/model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  /** stored the value when user do set data */
  public personalData: BehaviorSubject<User> = new BehaviorSubject(new User);

  constructor() { }

  /** set personal detail and get
   * data when user subscribe it */
  public setPersonalDetail(data: User) {
    return this.personalData.next(data);
  }
}
