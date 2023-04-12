import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/MaterialModule';
import { CompanyComponent } from './RMnewAssignmentComponent/company.component';
import { PopupComponent } from './RMCreateNewPopupComponent/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditassignmentComponent } from './RMeditAssignmentComponent/editassignment.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './RMHeader/header.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MbscModule } from '@mobiscroll/angular';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ViewAssignmentComponent } from './RMviewAssignmentComponent/view-assignment.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchComponent } from './search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditpopupComponent } from './RMeditPopupComponent/editpopup.component';
import { CommentpopupComponent } from './SMEcommentPopupComponent/commentpopup.component';
import { Header1Component } from './SMEHeader/header1.component';
import { MatSelectModule } from '@angular/material/select';
import { Search1Component } from './search1/search1.component';
import { ProgramComponent } from './SMEComponent/program.component';
import { Popup1Component } from './SMEPopupComponent/popup1.component';
import { Company1Component } from './AssociateComponent/company1.component';
import { Popup2Component } from './AssociateUploadFileComponent/popup2.component';
import { DatePipe } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';


import { SmeprogramcodepopupComponent } from './smeprogramcodepopup/smeprogramcodepopup.component';
import { SmeviewcomponentComponent } from './smeviewcomponent/smeviewcomponent.component';
import { RMSMEViewComponent } from './rmsmeview/rmsmeview.component';
import { RmsmeeditComponent } from './rmsmeedit/rmsmeedit.component';
import { AssociateHeaderComponent } from './associate-header/associate-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    PopupComponent,
    EditassignmentComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    ViewAssignmentComponent,
    SearchComponent,
    EditpopupComponent,
    CommentpopupComponent,
    Header1Component,
    Search1Component,
    ProgramComponent,
    Popup1Component,
    Company1Component,
    Popup2Component,
    RegistrationComponent,

   
    SmeprogramcodepopupComponent,
    CommentpopupComponent,
    SmeviewcomponentComponent,
    RMSMEViewComponent,
    RmsmeeditComponent,
    AssociateHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MbscModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
