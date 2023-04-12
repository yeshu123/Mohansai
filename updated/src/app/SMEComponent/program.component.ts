import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../RMCreateNewPopupComponent/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Popup1Component } from '../SMEPopupComponent/popup1.component';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Popup2Component } from '../AssociateUploadFileComponent/popup2.component';
import { SmeprogramcodepopupComponent } from '../smeprogramcodepopup/smeprogramcodepopup.component';
import { CommentpopupComponent } from '../SMEcommentPopupComponent/commentpopup.component';
import da from '@mobiscroll/angular/dist/js/i18n/da';
import { SmeviewcomponentComponent } from '../smeviewcomponent/smeviewcomponent.component';
import { Element } from '@angular/compiler';
import * as moment from 'moment';
import { faEye } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
})
export class ProgramComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  
  faEye=faEye;
  facircle=faCircle  
  faArrowDown = faArrowDown;
  faDownload = faDownload;

  currentLogInsme: any;

  value: any;
  enddate: Date;
  startdate: any;
  name: any;
  smemanager:any;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public router: Router
  ) {
    this.currentLogInsme = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata: any;
  finaldata: any;
  varStartDate: Date;
  ngOnInit(): void {
    
    this.LoadCompany();
    this.name = sessionStorage.getItem('currentUser');
    

    // const updatedDisplayColumns1 = this.displayColums1.map((column) => {
    //   if (column === 'startDate') {
    //     const startDatePlusOne = moment(this.finaldata.startDate).add(1, 'days');
    //     // console.log("startDatePlusOne:", startDatePlusOne);
    //     // console.log("hi");
    //     return 'startDatePlusOne';
    //   } else {
    //     return column;
    //   }
    // });

    // this.displayColums1 = updatedDisplayColumns1;

    // this.startdate.setDate(this.finaldata.endDate + 1);
    // this.enddate.setDate(this.finaldata.endDate + 4);

    // this.varStartDate.setDate(this.startdate + 1);
    // console.log(this.varStartDate);
  }

  displayColums: string[] = [
    'vamid',
    'resourceName',
    'techTrack',
    'category',
    'program',
    'startDate',
    'endDate',
    'DelayDays',
    'Attach',
    'SMEaction',
  ];
  displayColums1: string[] = [
    'vamid',
    'resourceName',
    'category',
    'program',
    'startDate',
    'endDate',
    'Delaydays',
    'smeStatus',
  ];
  Openpopup(data: any) {
    const _popup = this.dialog.open(SmeprogramcodepopupComponent, {
      disableClose:true,
      width: '700px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        item: data,
      },
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadCompany();
    });
  }
  

  commentsPopUp(data: any) {
    const _popup = this.dialog.open(CommentpopupComponent, {
      disableClose:true,
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        item: data,
      },
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadCompany();
    });
  }

  addDays(date: Date, days: number) {
    // console.log(typeof date);
    date.setDate(date.getDate() + 1);

    return date;
  }
  addEndDays(date: Date, days: number) {
    // console.log(typeof date);
    date.setDate(date.getDate() + 4);

    return date;
  }

  LoadCompany() {
    this.value = localStorage.getItem('id');
    this.api.GetUserData(this.value).subscribe((response:any) => {

      
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        response[i].endDate = new Date(response[i].endDate);
      }

      this.companydata = response;
      // console.log(this.companydata)
      let finaldata = JSON.parse(JSON.stringify(this.companydata));

      this.companydata = new MatTableDataSource<companymodel>(this.companydata);

      //  this.api.Getallcomapny().subscribe((response) => {
      //    this.companydata = response;

      for (let i = 0; i < finaldata.length; i++) {
        finaldata[i].startDate = this.addDays(
          new Date(finaldata[i].endDate),
          1
        );
      }
      for (let i = 0; i < finaldata.length; i++) {
        finaldata[i].endDate = this.addEndDays(new Date(finaldata[i].endDate), 4);
      }
      // console.log(finaldata);
      // console.log(response);

      finaldata = finaldata.filter(
        (item: any) =>
          item.programStatus === 'Submitted' ||
          item.programStatus === 'Under Review' ||
          item.programStatus === 'Approved'
          
      );
      this.finaldata = new MatTableDataSource<companymodel>(finaldata);
      this.smemanager=this.finaldata.manager;
      console.log(this.smemanager)
      
      // this.finaldata.paginator = this._paginator;
      // this.finaldata.sort = this._sort;
    });
  }

  // routing(historyId: any) {
  //   localStorage.setItem('id', historyId);
  //   // this.api.GetCompanybycode(id);
  //   this.router.navigate(['/smeprogramcodepopup']);
  //   this.router.navigate(['/smeprogramcodepopup'], {
  //     state: { example: historyId },
  //   });
  //   //this.api.GetCompanybycode(id);
  // }

  getdelayDays(endDate: Date): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = Math.floor(today.getTime() - end.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }
  getDelayDays(item: any) {
    if (item.programStatus === 'Open') {
      const today = new Date();
      const end = new Date(item.endDate);
      const diffTime = Math.floor(today.getTime() - end.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } else if (item.programStatus === 'Submitted' || item.programStatus === 'Under Review' || item.programStatus === 'Approved') {
      const today = new Date();
      const end = new Date(item.endDate);
      const diffTime = Math.floor(today.getTime() - end.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } else {
      return 0;
    }
  }
  

  EditCompany(data: any) {
    this.Openpopup(data);
  }
  EditComments(data: any) {
    this.commentsPopUp(data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
  }
}


