import { User } from 'src/app/model/user';
import { DataSharingService } from './../../service/data-sharing.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {

  /** personalDetial Form */
  public personalDetailFrom: FormGroup;

  /** to check form is submitted or not */
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: Router,
              private sharedService: DataSharingService) { }

  ngOnInit(): void {
    this.personalDetailFrom = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
    })
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

  /** to share the personalDetail of user */
  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.personalDetailFrom.invalid) {
      return;
    }
    const personalDataObj: User = {
      name: this.personalDetailFrom.value.name,
      email: this.personalDetailFrom.value.email,
      password: this.personalDetailFrom.value.password,
      contact_no: this.personalDetailFrom.value.contactNo,
      date_of_birth: this.personalDetailFrom.value.dateOfBirth,
      address: this.personalDetailFrom.value.address,
      business_name: ''
    }
    this.sharedService.setPersonalDetail(personalDataObj);
    this.route.navigate(['/user/business_detail']);
  }
}
