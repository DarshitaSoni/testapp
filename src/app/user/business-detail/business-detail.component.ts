import { UserService } from './../../service/user.service';
import { User } from 'src/app/model/user';
import { DataSharingService } from './../../service/data-sharing.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  /** businessDetail Form */
  public businessDetailForm: FormGroup;

  /** to check form is submitted or not */
  public submitted: boolean = false;

  /**to get personal data of user */
  public personalData: User;

  /** subscription array */
  public subscriptions: Subscription[] = [];

  public personalDetail: Subscription


  constructor(private formBuilder: FormBuilder, private sharedService: DataSharingService,
              private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.personalDetail = this.sharedService.personalData.subscribe(data => {
      this.personalData = data;
    });
    this.businessDetailForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      buinessBranches: this.formBuilder.array([this.formBuilder.group({
        area: ['', Validators.required],
        contact: ['', Validators.required],
      })])
    });
  }

  /** addresses formArray */
  public get buinessBranches(): FormArray {
    return this.businessDetailForm.get('buinessBranches') as FormArray;
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

  /** to submit the user detail */
  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.businessDetailForm.invalid) {
      return;
    }
    const obj: object = {
      name: this.personalData.name,
      email: this.personalData.email,
      contact_no: this.personalData.contact_no,
      date_of_birth: this.personalData.date_of_birth,
      address: this.personalData.address,
      business_name: this.businessDetailForm.value.businessName
    }
    this.userService.addUser(obj).subscribe(data => {
      alert('Added successfully');
    });
    this.route.navigate(['/user/list']);
    this.subscriptions.push(this.personalDetail);
  }

   /** to add new address branch */
   public addBranch(): void {
    this.buinessBranches.push(this.formBuilder.group({
      area: '',
      contact: '',
    }));
  }

  /** to remove the address branch */
  public removeBranch(index: number): void {
    if (index === 0) {
      alert('Please add Address');
    } else {
      this.buinessBranches.removeAt(index);
    }
  }
}
