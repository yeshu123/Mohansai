import { Component, Inject, OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { DatePipe } from '@angular/common';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { techtracks } from '../Model/techtracks';
[DatePipe];
@Component({
  selector: 'app-editpopup',
  templateUrl: './editpopup.component.html',
  styleUrls: ['./editpopup.component.css'],
})
export class EditpopupComponent implements OnInit {
  // @ViewChild('closebutton') closebutton;

  editdata: FormGroup;
  public listitems: any;
  public categoryItems: any;
  public programItems:any[];
  date: any;
  EditpopupComponent: any;
  Res: any;
  track: techtracks[];
  // tecktracks: any = ['.NET', 'Java'];
  techTrack:any;
  categories: any;
  ProgramsTrackerId:any;
  minDate: string;
  private popupContainer: HTMLElement;
  private closeBtn: HTMLElement;
  category: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      const today = new Date();
      this.minDate = today.toISOString().slice(0, 10);
//       const popupContainer = document.querySelector('.popup-container');
// const closeBtn = document.querySelector('.close-button');



  }


  ngOnInit() {
    if (this.data.item.id) {
      this.api
        .GetCompanybycode(this.data.item.historyId)
        .subscribe((response) => {
          this.Res = response;
          if (this.Res != null) {
            this.editdata = this.builder.group({
              id: [this.Res.id, Validators.required],
              historyId: [this.Res.historyId],
              vamid: [this.Res.vamid, Validators.required],
              resourceName: [this.Res.resourceName, Validators.required],
              email: [this.Res.email, Validators.required],
              manager: [this.Res.manager, Validators.required],
              techTrack: [this.Res.techTrack, Validators.required],
              startDate: [
                this.datepipe.transform(this.Res.startDate, 'yyyy-MM-dd'),
                Validators.required,
              ],
              endDate: [
                this.datepipe.transform(this.Res.endDate, 'yyyy-MM-dd'),
                Validators.required,
              ],
              sme: [this.Res.sme, Validators.required],
              category: [this.Res.programsTracker.category],
              ProgramsTrackerId: [this.Res.programsTracker.ProgramsTrackerId],
              smeStatus: [this.Res.smeStatus],
              programStatus: [this.Res.programStatus],
            });
          }
        });
      // this.editdata = this.builder.group({
      //   id: [this.Res.id, Validators.required],
      //   vamid: [this.Res.vamId, Validators.required],
      //   resourceName: [this.Res.resourceName, Validators.required],
      //   email: [this.Res.email, Validators.required],
      //   manager: [this.Res.manager, Validators.required],
      //   techTrack: [this.Res.techTrack, Validators.required],
      //   startDate: [this.Res.startDate, Validators.required],
      //   endDate: [this.Res.endDate, Validators.required],
      //   sme: [this.Res.sme, Validators.required],
      //   ProgramsTrackerId: [this.Res.ProgramsTrackerId, Validators.required]
      // });
    }
  }



  // changeTrack(e: any) {
  //   this.editdata.setValue(e.target.value, {
  //     onlySelf: true,
  //   });
  // }

  // companyform = this.builder.group({
  //   id: this.builder.control({ value: '', disabled: true }),
  //   vamid: this.builder.control('', Validators.required),
  //   resourceName: this.builder.control('', Validators.required),
  //   email: this.builder.control('', Validators.required),
  //   manager: this.builder.control('', Validators.required),
  //   techTrack: this.builder.control('', Validators.required),
  //   startDate: this.builder.control('', Validators.required),
  //   endDate: this.builder.control('', Validators.required),
  //   sme: this.builder.control('', Validators.required),
  //   //ProgramStatus: this.builder.control('', Validators.required),
  // });

  // SaveCompany() {
  //   if (this.companyform.valid) {
  //     const Editid = this.companyform.getRawValue().id;
  //     if (Editid != '' && Editid != null) {
  //       this.api
  //         .UpdateComapny(Editid, this.companyform.getRawValue())
  //         .subscribe((response) => {
  //           this.closepopup();
  //           alertify.success('Updated successfully.');
  //         });
  //     } else {
  //       this.api.CreateComapny(this.companyform.value).subscribe((response) => {
  //         this.closepopup();
  //         alertify.success('saved successfully.');
  //       });
  //     }
  //   }
  // }

  closepopup() {
    this.dialog.closeAll();
  }

  onSubmit() {
    // this.editdata.startDate = this.companyform.get('date')?.value;
    const Editid = this.editdata.getRawValue().historyId;
    if (Editid != '' && Editid != null) {
      var data = JSON.stringify(this.editdata.value);
      this.api
        .UpdateComapny(Editid, data)
        .subscribe((response) => {
          // let x = this.editdata.controls.startDate.getRawValue();
          // this.companyform.patchValue({ startDate: x });
          // this.companyform.controls.startDate.setValue(x);
          // console.log(x);
          this.closepopup();
          alertify.success('Updated successfully.');
        });
    }
  }
  //this.companyform.getRawValue()
  dropdown() {
    this.api.getProgramDropDown().subscribe((data: any[]) => {
            this.listitems = data;
      console.log(this.listitems);
    });
  }

  CategoryDropdown(){
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
}
