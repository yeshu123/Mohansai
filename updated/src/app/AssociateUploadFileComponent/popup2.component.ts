import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { SubmitService } from '../submit.service';
@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css'],
})
export class Popup2Component implements OnInit, OnChanges {
  formdata: FormGroup;
  id: any;
  historyId: any;
  resp: any;
  code: string = '';
  editdata: any;
  datepipe: any;
  @Input() programStatus: string = 'Submitted';
  // initialize with default value
  isSubmitting: boolean=false;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private submitSevice: SubmitService,
    public _popup: MatDialogRef<Popup2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.api.GetCompanybycode(this.data.item.historyId).subscribe((response) => {
      this.resp = response;
      this.formdata = this.builder.group({
        historyId: [this.resp.historyId],
        programStatus: [this.programStatus, Validators.required],
        programCode: [this.resp.programCode],
        smeComments:[this.resp.smeComments]
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['programStatus']) {
      this.formdata.patchValue({ programStatus: this.programStatus }); // update form control with new programStatus value
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

  onSubmit() {
    let data = this.formdata.value;
    this.isSubmitting=true;
    this.api.UpdateProgramCode(this.data.item.historyId, data).subscribe((response) => {
      // this.formdata.controls['programCode'].disable();
      this.isSubmitting=false;
      this.closepopup();
      alertify.success('Updated successfully.');
    });
  }
}
