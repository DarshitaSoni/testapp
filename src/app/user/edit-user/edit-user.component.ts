import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** component directive */
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  /** editDetail form */
  public editDetailForm: FormGroup;

  public submitted: boolean = false;

  /** id of sepcific user */
  public id: number;

  /** subscription array */
  public subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private acroute: ActivatedRoute,
              private formBuilder: FormBuilder, private route: Router) { }

  /** ngOninit method */
  public ngOnInit(): void {
    this.id = this.acroute.snapshot.params['id'];
    const userById = this.userService.getUserById(this.id).subscribe(data => {
      const userData: User = data;
      this.editDetailForm = this.formBuilder.group({
        name: [userData.name ? userData.name : '', Validators.required],
        email: [userData.email ? userData.email : '', [Validators.required,
               Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        contactNo: [userData.contact_no ? userData.contact_no : '', [Validators.required, Validators.pattern("^[0-9]*$"),]],
        dateOfBirth: [userData.date_of_birth ? userData.date_of_birth : '', Validators.required],
        address: [userData.address ? userData.address : '', Validators.required],
        businessName: [userData.business_name ? userData.business_name : '', Validators.required]
      });
    });
    this.subscriptions.push(userById);
  }

  /** keypress event for characters */
  public onlyChar(event): boolean {
    return((event.charCode > 64 && event.charCode < 91) ||
          (event.charCode > 96 && event.charCode < 123) ||
          event.charCode === 8 || event.charCode === 32 );
  }

  /** keypress event for numbers */
  public onlyNumber(event): boolean {
    return((event.charCode > 48 && event.charCode < 57))
  }

  public onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editDetailForm.invalid) {
      return;
    }
    const editValueObj = {
      id: this.id,
      name: this.editDetailForm.value.name,
      email: this.editDetailForm.value.email,
      contact_no : this.editDetailForm.value.contactNo,
      date_of_birth:this.editDetailForm.value.dateOfBirth,
      address: this.editDetailForm.value.address,
      business_name: this.editDetailForm.value.businessName
    };
    this.userService.editUser(editValueObj).subscribe(res => {
      alert('Updated successfully');
    });
    this.route.navigate(['/user/list']);
  }

  /** onDestroy method  */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
