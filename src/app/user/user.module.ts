import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from '../user/user.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    UserComponent,
    PersonalDetailComponent,
    BusinessDetailComponent,
    ListUsersComponent,
    EditUserComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
