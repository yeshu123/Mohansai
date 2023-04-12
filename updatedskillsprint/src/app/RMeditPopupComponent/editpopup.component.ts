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
  programName:any;
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
              category: [this.Res.category],
              // program: [this.Res.programsTracker.program],
              smeStatus: [this.Res.smeStatus],
              programStatus: [this.Res.programStatus],
              programCode:[this.Res.programCode]
            });
          }
        });
         }
  }
  closepopup() {
    this.dialog.closeAll();
  }
  SaveData() {
    if (this.editdata.valid) {
      const Editid = this.editdata.getRawValue().historyId;
      if (Editid != '' && Editid != null) {
        const data = JSON.stringify(this.editdata.getRawValue());
        this.api.UpdateComapny(Editid, data).subscribe((response) => {
          console.log(response);
          this.dialog.closeAll();
          alertify.success('Updated successfully.');
        });
      }
    } else {
      alertify.error('Please fill all required fields.');
    }
  }
  

  // SaveData() {
  //   // this.editdata.startDate = this.companyform.get('date')?.value;
  //   // const Editid = this.editdata.getRawValue().historyId;
  //   // if (Editid != '' && Editid != null) {
  //   //   var data = JSON.stringify(this.editdata.value);
  //   //   this.api
  //   //     .UpdateComapny(Editid, data)
  //   //     .subscribe((response) => {
  //   //       // let x = this.editdata.controls.startDate.getRawValue();
  //   //       // this.companyform.patchValue({ startDate: x });
  //   //       // this.companyform.controls.startDate.setValue(x);
  //   //       console.log(response);
  //   //       this.closepopup();
  //   //       alertify.success('Updated successfully.');
  //   //     });
  //   // }
  // }
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
}
