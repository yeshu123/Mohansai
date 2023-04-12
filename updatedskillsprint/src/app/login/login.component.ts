import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@mobiscroll/angular/dist/js/angular/form-control';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';
  email!: string;
  password!: string;
  userData: any;
  varUserEmail: any;
  userRecord: any;
  varCurrentUser: any;
  submitted = false;

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private http: HttpClient,
    private builder: FormBuilder,
    public router: Router
  ) {}
  loginform = this.builder.group({
    email: this.builder.control('', [Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-z]{2,4}$")]),
    password: this.builder.control('', Validators.required),
  });

  get f() { return this.loginform.controls; }

  // loginform = new FormGroup({
  //   email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  //   password:new FormControl('',Validators.required)
  // });



  ngOnInit(): void {}

  signIn() {
    this.submitted = true;
    if (this.loginform.valid) {
      this.api.getUsers().subscribe((data: any[]) => {
        this.userData = data;
             var varLoginUser = this.userData.filter(
               (item: any) =>
                 item.email === this.loginform.value.email &&
                 item.password === this.loginform.value.password
             );


        var varEmail = varLoginUser.map((x: any) => x.role);
        var varVamId = varLoginUser[0].vamid;
        var varUserEmail = varLoginUser[0].email;
        this.api.GetUserByEmail(varUserEmail).subscribe((userRecord: any) => {
          this.userRecord = userRecord;
        });
         var varCurrentUser = varLoginUser[0].name;
        sessionStorage.setItem('currentUser', varCurrentUser);
         sessionStorage.setItem('currentUserVamId', varVamId);

        if (varEmail == 'Associate') {
          this.router.navigateByUrl('resource', {
            state: { vamid: varVamId, userid: this.userRecord.id },
          });
        }
        var varSME = varLoginUser[0].email;


        if (varEmail == 'SME') {
          // this.router.navigateByUrl('SME');
          this.router.navigateByUrl('SME', {
            state: { name: varSME },
          });
          // console.log(varEmail);
        }
        if (varLoginUser[0].role == 'Manager') {
          this.router.navigateByUrl('company', {
            state: { name: varCurrentUser },
          });

        } else {
          this.message = 'Your email or password was not valid';
        }
      });
    }
    else {
      this.message = 'Your email or password was not valid';
    }

  }
}
