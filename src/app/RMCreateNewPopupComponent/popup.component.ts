import { Component, Input, Output, EventEmitter, HostListener, Inject, OnInit, ElementRef, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { HttpClient } from '@angular/common/http';
import { companymodel } from '../Model/companymodel';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { techtracks } from '../Model/techtracks';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {

  editdata: any;
  public listitems: any;
  track: techtracks[];
  id: number;
  vamid: number | undefined;
  name: string = '';

  manager: string | null | undefined;
  email: string = '';
  ProgramStatus: string = '';
  techTrack: string;
  category:any;
  ProgramsTrackerId:number|null;
  public startDate: any;
  public endDate: any;
  sme: any;
  userdetails: any;
  enddatedetails: any;
  regForm: FormGroup;
  isSubmited: boolean = false;
  resourceName: any;
  todayDate: Date;
  minDate: string;
  programItems: any[] = [];
  // submitted = false;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private http: HttpClient,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.regForm = this.companyform;
    dialogRef.disableClose = true;
    const today = new Date();
    this.minDate = today.toISOString().slice(0, 10);
    const todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }
  // open() { this.dialog.open(PopupComponent, { disableClose: true }); }
  ngOnInit(): void {
    if (this.data.vamid != '' && this.data.vamid != null) {
      this.api.GetCompanybycode(this.data.vamid).subscribe((response: any) => {
        this.editdata = response;
        this.companyform.setValue({
          id: this.editdata.id,
          vamid: this.editdata.vamid,
          resourceName: this.editdata.resourceName,
          email: this.editdata.email,
          manager: this.editdata.manager,
          techTrack: this.editdata.techTrack,
          category:this.editdata.category,
          // ProgramsTrackerId:this.editdata.ProgramsTrackerId,
          startDate: this.editdata.startDate,
          endDate: this.editdata.endDate,
          sme: this.editdata.sme,
        });
        // sessionStorage.setItem('smemanager',this.data.vamid.manager);
        // console.log(this.data.manager);
      });
    }


  }
  public categoryItems:any;
  // public programItems:any;

  // CategoryDropdown(){
  //    this.api.getprogamCategory(this.techTrack).subscribe((data:any) => {
  //     this.categoryItems = data;
  //     console.log(this.categoryItems);
  //   })
  // }
  CategoryDropdown() {
    this.api.getCategory(this.techTrack).subscribe((data:any) => {
      this.categoryItems = data;
      console.log(this.categoryItems);
    })
  }
  
  
  programDropdown(){
    this.api.getProgram(this.techTrack,this.category).subscribe((data:any) => {
    this.programItems = data;
    console.log(this.programItems);
    })
  }

  updateEndDate() {

    let endDate = new Date(
      this.startDate.getFullYear() + 1,
      this.startDate.getMonth(),
      this.startDate.getDate()
    );
    this.companyform.controls.endDate.setValue(
      formatDate(endDate, 'yyyy-MM-dd', 'en-US')
    );
  }
  // var varEmail = companyform.map((x: any) => x.role);
   companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    vamid: this.builder.control('', Validators.required),
    resourceName: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    manager: this.builder.control('', [Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-z]{2,4}$")]),
    techTrack: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    // ProgramsTrackerId:this.builder.control('',Validators.required),
    startDate: this.builder.control('', Validators.required),
    endDate: this.builder.control('', Validators.required),
    sme: this.builder.control('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-z]{2,4}$")]),
    //ProgramStatus: this.builder.control('', Validators.required),
  });

  // get f() { return this.companyform.controls; }

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().vamid;
      if (Editid != '' && Editid != null) {
        this.api
          .UpdateComapny(Editid, this.companyform.getRawValue())
          .subscribe((response) => {
            this.closepopup();
            alertify.success('Updated successfully.');
          });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe((response) => {
          this.closepopup();
          alertify.success('saved successfully.');
          // smemanager=this.companyform.manager;
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

  dropdown() {
    this.api.getProgramDropDown().subscribe((data: any[]) => {
            this.listitems = data;
      console.log(this.listitems);
    });
  }

  UserInfo(vamid: any) {
    this.api.getUserInfo(vamid).subscribe((data: any[]) => {
      this.userdetails = data;
      console.log(this.userdetails);
    });
  }
  getEndDate(event: any) {
    this.companyform.controls.startDate.setValue(event.target.value);
    let startDate = this.companyform.controls.startDate.value;
    this.api.getendDateApi(startDate).subscribe((data: any) => {
      this.enddatedetails = data;
      let x = this.datepipe.transform(this.enddatedetails, 'yyyy-MM-dd');
      this.companyform.patchValue({ endDate: x });
      this.companyform.controls.endDate.setValue(x);
      console.log(x);
    });
  }
   submit() {
    //  this.submitted = true;
    const companyform = {
      vamid: this.vamid,
      resourceName: this.userdetails.name,
      manager: this.manager,
      email: this.userdetails.email,
      techTrack: this.techTrack,
      category:this.category,
      // ProgramsTrackerId:this.ProgramsTrackerId,
      startDate: this.companyform.controls.startDate.value,
      endDate: this.datepipe.transform(this.enddatedetails, 'yyyy-MM-dd'),
      sme: this.sme,
    }
    this.http
      .post(
        'https://localhost:7260/api/Assign',
        companyform
      )
      .subscribe((res) => console.log(res));
      console.log(companyform)
   
    
    
    
    //console.log(companyform);
    this.closepopup();
    alertify.success('saved successfully.');
  }
  // disableProgramsTrackerIdDropdown() {
  //   const ProgramsTrackerIdDropdown = document.getElementById('inputState-ProgramsTrackerId');
  //   if (ProgramsTrackerIdDropdown) {
  //     ProgramsTrackerIdDropdown.setAttribute('disabled', 'true');
  //   }
  // }
}


