import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup1',
  templateUrl: './commentpopup.component.html',
  styleUrls: ['./commentpopup.component.css'],
})
export class CommentpopupComponent implements OnInit {
  editdata: any;
  public listitems: Array<string> = [];
  formdata: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // if (this.data.item.historyId != '' && this.data.item.historyId != null) {
    //   this.api
    //     .GetCompanybycode(this.data.item.historyId)
    //     .subscribe((response) => {
    //       this.editdata = response;
    //     });
    // }
      this.formdata = this.builder.group({
        id: this.builder.control({ value: '', disabled: true }),
        historyId: this.builder.control({ value: '', disabled: true }),
        // vamid: this.builder.control('', Validators.required),
        // name: this.builder.control('', Validators.required),
        // email: this.builder.control('', Validators.required),

        // programName: this.builder.control('', Validators.required),
        // startDate: this.builder.control('', Validators.required),
        // endDate: this.builder.control('', Validators.required),
        // SMEName: this.builder.control('', Validators.required),
        programStatus: this.data.item.programStatus,
        //this.builder.control('', Validators.required),
        //smeStatus: 'Under Review',
        smeComments: this.data.item.smeComments,
        programCode: this.data.item.programCode,
      });
  }
  approved() {
    this.formdata.patchValue({ programStatus: 'Approved' });
    this.api
      .UpdateComments(this.data.item.historyId, this.formdata.value)
      .subscribe((response) => {
        this.closepopup();
        alertify.success('Updated successfully.');
      });
  }
  onReview() {
    this.formdata.patchValue({ programStatus: 'Under Review' });
    // this.companyform.patchValue({
    //   programCode: this.data.item.programCode,
    // });
    let data = this.formdata.value;
    this.api
      .UpdateComments(this.data.item.historyId, data)
      .subscribe((response) => {
        this.closepopup();
        alertify.success('Updated successfully.');
        //console.log("kkkk")
      });
  }
  // approved(id:any) {
  //   id.smeStatus = 'approved';

  //   console.log("came")
  //   this.api.UpdateComments(this.data.id, Comment).subscribe(response => {

  //     this.closepopup();
  //     alertify.success('Updated successfully.');
  //   });
  // }



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

  dropdown() {
    this.api.getProgramDropDown().subscribe((data: any[]) => {
      data.forEach((element) => {
        this.listitems.push(element['techtrack']);
      });
    });
  }

  // onReview() {
  //   let data = this.formdata.value;
  //   this.api
  //     .UpdateComments(this.data.id, this.formdata.value)
  //     .subscribe((response) => {
  //       this.closepopup();
  //       alertify.success('Updated successfully.');
  //     });
  // }
}

// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ApiService } from '../shared/api.service';
// import * as alertify from 'alertifyjs';

// @Component({
//   selector: 'app-commentpopup',
//   templateUrl: './commentpopup.component.html',
//   styleUrls: ['./commentpopup.component.css']
// })
// export class CommentpopupComponent implements OnInit {

//   // comment="Hi";

//   editdata: any;
//   public listitems : Array<string> =["Java",".NET"];

//   constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   ngOnInit(): void {
//     if (this.data.vamid != '' && this.data.vamid != null) {
//       this.api.GetCompanybycode(this.data.vamid).subscribe(response => {
//         this.editdata = response;
//         this.companyform.setValue({
//           // id: this.editdata.id,
//           vamid: this.editdata.vamid,name: this.editdata.name, email: this.editdata.email,
//           TechTrack: this.editdata.TechTrack, startDate: this.editdata.startDate, endDate: this.editdata.endDate,
//           SMEName: this.editdata.SMEName,ProgramStatus: this.editdata.ProgramStatus
//         });
//       });
//     }
//   }

//   companyform = this.builder.group({
//     // id: this.builder.control({ value: '', disabled: true }),
//     vamid: this.builder.control('', Validators.required),
//     name: this.builder.control('', Validators.required),
//     email: this.builder.control('', Validators.required),

//     TechTrack: this.builder.control('', Validators.required),
//     startDate: this.builder.control('', Validators.required),
//     endDate: this.builder.control('', Validators.required),
//     SMEName: this.builder.control('', Validators.required),
//     ProgramStatus: this.builder.control('', Validators.required),
//   });

//   SaveCompany() {
//     if (this.companyform.valid) {
//       const Editid = this.companyform.getRawValue().vamid;
//       if (Editid != '' && Editid != null) {
//         this.api.UpdateComapny(Editid, this.companyform.getRawValue()).subscribe(response => {
//           this.closepopup();
//           alertify.success("Updated successfully.")
//         });
//       } else {
//         this.api.CreateComapny(this.companyform.value).subscribe(response => {
//           this.closepopup();
//           alertify.success("saved successfully.")
//         });
//       }
//     }
//   }

//   closepopup() {
//     this.dialog.closeAll();
//   }

//   dropdown(){
//     this.api.getProgramDropDown().subscribe((data: any[])=>{
//       data.forEach(element => {
//         this.listitems.push(element["techtrack"]);

//       });
//     })
//   }

// }
