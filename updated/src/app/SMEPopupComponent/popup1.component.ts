import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup1',
  templateUrl: './popup1.component.html',
  styleUrls: ['./popup1.component.css'],
})
export class Popup1Component implements OnInit {
  editdata: any;
  public listitems: Array<string> = [];
  formdata: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetCompanybycode(this.data.id).subscribe((response) => {
        this.editdata = response;
      });
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    // vamid: this.builder.control('', Validators.required),
    // name: this.builder.control('', Validators.required),
    // email: this.builder.control('', Validators.required),

    // programName: this.builder.control('', Validators.required),
    // startDate: this.builder.control('', Validators.required),
    // endDate: this.builder.control('', Validators.required),
    // SMEName: this.builder.control('', Validators.required),
    programStatus: this.builder.control('', Validators.required),
    smeStatus: "Under Review",
    smeComments: this.builder.control('', Validators.required)
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
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
        });
      }
    }
  }

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
  onReview() {
    let data = this.formdata.value;
    this.api
      .UpdateComments(this.data.id, this.formdata.value)
      .subscribe((response) => {
        this.closepopup();
        alertify.success('Updated successfully.');
      });
  }
}
