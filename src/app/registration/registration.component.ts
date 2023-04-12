import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import * as alertify from 'alertifyjs';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  // title = 'Registration';
  submitted = false;
  userModel = new User('', '', '', '', '');
  // userModel = User;
  selectedGrade: string;
  selectedRole: string;
  
  constructor(private api: ApiService, private http: HttpClient) {}

  onSubmit() {
    this.submitted = true;
    console.log(this.userModel);
  }
  onUserSubmit() {
    this.submitted = true;
    console.log(this.userModel);

    this.api.CreateUser(this.userModel).subscribe((data: any) => {
      console.log(data);
      alertify.success('saved successfully.');
      // console.log(data);
    });
  }
  UpdateSelectedRole() {
    if (this.selectedGrade === 'Grade A1' || this.selectedGrade === 'Grade A2' || this.selectedGrade === 'Grade A3') {
      this.selectedRole = 'Associate';
    } else if (this.selectedGrade === 'Grade A4' || this.selectedGrade === 'Grade A5') {
      this.selectedRole = 'SME';
    } 
  }

  ngOnInit(): void {}
}
