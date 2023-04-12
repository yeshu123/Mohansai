import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { Popup2Component } from '../AssociateUploadFileComponent/popup2.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome, faEye } from '@fortawesome/free-solid-svg-icons';
import { SubmitService } from '../submit.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company1',
  templateUrl: './company1.component.html',
  styleUrls: ['./company1.component.css'],
})
export class Company1Component implements OnInit {
  faHome = faHome;
  isSubmitted: boolean = false;
  companyform: any;
  faEye=faEye;
  // finaldataUpdated: MatTableDataSource<companymodel>;
  // varLoginUser: any;
  currentLogInVamId: any;
  name: any;
  vamid: any;
  programStatus:string='';


  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public submitService: SubmitService,
    public router: Router,

  ) {
    this.currentLogInVamId = this.router.getCurrentNavigation()?.extras.state;
    // this.programStatus = 'Submitted';
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;

  ngOnInit(): void {
    // this.programStatus='Submitted'
    this.LoadCompany();
    this.name = sessionStorage.getItem('currentUser');
    this.vamid=  sessionStorage.getItem('currentUserVamId');

  }
  updateProgramStatus(newStatus: string) {
    this.programStatus = newStatus;
  }
  displayColums: string[] = [
   'id',
    // 'historyId',
    'techTrack',
    'category',
    'program',
    'startDate',
    'endDate',
    'Delaydays',
    'sme',
    'programStatus',
    'upload',
    'comments',
    // 'SMEComments',
  ];
  SaveCompany() {
    this.isSubmitted = true;
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
    throw new Error('Method not implemented.');
  }
  Openpopup(data: any) {
    console.log('Program status:', this.programStatus);
    const _popup = this.dialog.open(Popup2Component, {
      disableClose:true,
      width: '760px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        item: data,
        programStatus:this.programStatus,
        
      },
    });
    _popup.afterClosed().subscribe(() => {
      this.LoadCompany();
    });
  }
  getProgramStatus(){
    return this.programStatus;
  }

  LoadCompany() {
    this.api
      .GetAllHistoryRecordsById(this.currentLogInVamId.userid)
      .subscribe((response) => {
        this.companydata = response;
        let finaldata = this.companydata.filter(
          (item: any) => item.vamid === this.currentLogInVamId.vamid
        );
        this.finaldata = new MatTableDataSource<companymodel>(finaldata);
        this.finaldata.paginator = this._paginator;
        this.finaldata.sort = this._sort;
      });
  }
  // getDelayDays(item: any) {
  //   if (item === 'Submitted') {
  //     const today = new Date();
  //     const end = new Date(item.endDate);
  //     const diffTime = Math.floor(today.getTime() - end.getTime());
  //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //     return diffDays > 0 ? diffDays : 0;
  //   } else {
  //     return 0;
  //   }
  // }
  // getDelayDays(item: any) {
  //   const today = new Date();
  //   const end = new Date(item.endDate);
  //   const diffTime = Math.floor(today.getTime() - end.getTime());
  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //   if (diffDays > 0 && (item.programStatus === 'Submitted' || item.programStatus === 'Under Review' || item.programStatus === 'Approved')) {
  //     return diffDays;
  //   } else {
  //     return 0;
  //   }
  // }
  getDelayDays(item: any) {
    if (item.programStatus !== 'Open' && item.programStatus !== 'Submitted') {
      return 0;
    }
  
    const today = new Date();
    const end = new Date(item.endDate);
    const diffTime = Math.floor(today.getTime() - end.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (item.programStatus === 'Open' || (diffDays > 0 && item.programStatus === 'Submitted')) {
      return diffDays;
    } else {
      return 0;
    }
  }
  
  
  
  
  
  EditCompany(data: any) {
    this.Openpopup(data);
  }
  RemoveCompany(id: any) {
    alertify.confirm(
      'Remove Assignment',
      'do you want delete the assignment?',
      () => {
        this.api.RemoveCompanybycode(id).subscribe((r) => {
          this.LoadCompany();
        });
      },
      function () {}
    );
  }
}
