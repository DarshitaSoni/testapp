import { UserService } from './../../service/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

/** component directive */
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  /** for listing user */
  public listUser: User[] = [];

  /** subscription array */
  public subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private route: Router) { }

  /** ngOninit method */
  public ngOnInit(): void {
    const listUser = this.userService.listUsers().subscribe(res => {
      this.listUser = res;
    });
    this.subscriptions.push(listUser);
  }

  /** update method to update the job */
  public onUpdate(item: User): void {
    this.route.navigate(['user/edit_detail/', item.id]).catch( err => {
      return err;
    });
  }

  /** delete method to delete the user */
  public onDelete(id): void {
    let index = this.listUser.findIndex(x => x['id'] == id);
    this.listUser.splice(index, 1);
    this.userService.deleteUser(id).subscribe(data => {
    });
  }

  /** onDestroy method  */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
