import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddproductComponent } from './addproduct/addproduct.component';
import { CompanyComponent } from './RMnewAssignmentComponent/company.component';
import { EditassignmentComponent } from './RMeditAssignmentComponent/editassignment.component';
import { LoginComponent } from './login/login.component';
import { ViewAssignmentComponent } from './RMviewAssignmentComponent/view-assignment.component';
import { Company1Component } from './AssociateComponent/company1.component';
import { ProgramComponent } from './SMEComponent/program.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { registerLocaleData } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { SmeviewcomponentComponent } from './smeviewcomponent/smeviewcomponent.component';
import { RMSMEViewComponent } from './rmsmeview/rmsmeview.component';
import { RmsmeeditComponent } from './rmsmeedit/rmsmeedit.component';
import { Header1Component } from './SMEHeader/header1.component';
import { HeaderComponent } from './RMHeader/header.component';
const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    pathMatch: 'full',
  },
  {
    component: RegistrationComponent,
    path: 'Registration',
    pathMatch: 'full',
  },

  {
    component: CompanyComponent,
    path: 'company',

    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: EditassignmentComponent,
    path: 'editassignment',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: EditassignmentComponent,
    path: 'editassignment/:id',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: ProgramComponent,
    path: 'program/:id',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: RmsmeeditComponent,
    path: 'rmsmeedit/:id',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: ViewAssignmentComponent,
    path: 'viewassignment',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: RMSMEViewComponent,
    path: 'smeassignment',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: Company1Component,
    path: 'resource',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: SmeviewcomponentComponent,
    path: 'SME',
    pathMatch: 'full',
    // canActivate: [AuthGuardService],
  },
  {
    component: LoginComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: HeaderComponent,
    path: 'header',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
