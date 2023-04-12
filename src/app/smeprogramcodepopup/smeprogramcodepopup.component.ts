// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-smeprogramcodepopup',
//   templateUrl: './smeprogramcodepopup.component.html',
//   styleUrls: ['./smeprogramcodepopup.component.css']
// })
// export class SmeprogramcodepopupComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { SubmitService } from '../submit.service';
import { ProgramComponent } from '../SMEComponent/program.component';

@Component({
  selector: 'app-smeprogramcodepopup',
  templateUrl: './smeprogramcodepopup.component.html',
  styleUrls: ['./smeprogramcodepopup.component.css'],
})
export class SmeprogramcodepopupComponent implements OnInit {
  [x: string]: any;
  formdata: FormGroup;
  // public listitems: Array<string> = [];
  // programCode: any;
  id: any;
  historyId: any;
  resp: any;
  code: string = '';
  editdata: any;
  datepipe: any;
  value: any;
  date: any;

  setValue() {
    console.log(this.code);
  }
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private submitSevice: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    //  this.value= localStorage.getItem('id');

    this.api.GetProgramCode(this.data.item.historyId).subscribe((response) => {
      this.resp = response;
      this.formdata = this.builder.group({
        historyId: [this.resp.historyId],
        programStatus: [this.resp.programStatus],
        programCode: [this.resp.programCode],

        // smeStatus: [this.resp.smeStatus, Validators.required],
      });
    });
  }
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  closepopup() {
    this.dialog.closeAll();
  }

  // onSubmit() {
  //   let data = this.formdata.value;
  //   this.api
  //     .UpdateProgramCode(this.data.item.historyId, data)
  //     .subscribe((response) => {
  //       console.log(data);
  //       this.closepopup();
  //       alertify.success('Updated successfully.');
  //     });
  // }

  // const Editid = this.editdata.getRawValue().historyId;
  // if (Editid != '' && Editid != null) {
  //   var data = JSON.stringify(this.editdata.value);
  //   this.api
  //     .UpdateProgramCode(Editid, data)
  //     .subscribe((response) => {
  // let x = this.editdata.controls.startDate.getRawValue();
  // this.companyform.patchValue({ startDate: x });
  // this.companyform.controls.startDate.setValue(x);
  // console.log(x);
  //   this.closepopup();
  //   alertify.success('Updated successfully.');
  // });
}

  