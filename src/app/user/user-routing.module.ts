import { EditUserComponent } from './edit-user/edit-user.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path:  '', component:  UserComponent,
    children: [
      { path: 'list', component:  ListUsersComponent},
      { path: 'personal_detail', component:  PersonalDetailComponent },
      { path: 'business_detail', component:  BusinessDetailComponent },
      { path: 'edit_detail/:id', component: EditUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
