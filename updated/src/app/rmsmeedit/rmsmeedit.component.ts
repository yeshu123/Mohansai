import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../RMCreateNewPopupComponent/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome } from '@fortawesome/free-solid-svg-icons';
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
import { RMSMEViewComponent } from '../rmsmeview/rmsmeview.component';

@Component({
  selector: 'app-rmsmeedit',
  templateUrl: './rmsmeedit.component.html',
  styleUrls: ['./rmsmeedit.component.css'],
})
export class RmsmeeditComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faDownload = faDownload;
  currentLogInsme: any;
  value: any;
  enddate: Date;
  startdate: any;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public router: Router
  ) {
    this.currentLogInsme = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;

  ngOnInit(): void {
    this.LoadCompany();

    this.startdate.setDate(this.finaldata.endDate + 1);
    this.enddate.setDate(this.finaldata.endDate + 4);
  }

  displayColums: string[] = [
    'techTrack',
    'program',
    'startDate',
    'endDate',
    'DelayDays',
    'Attach',
    'SMEaction',
    'comments'
  ];
  displayColums1: string[] = [
    'techTrack',
    'category',
    'program',
    'startDate',
    'endDate',
    'Delaydays',
    'smeStatus',
    'comments'
  ];
  Openpopup(data: any) {
    const _popup = this.dialog.open(SmeprogramcodepopupComponent, {
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

  LoadCompany() {
    this.value = localStorage.getItem('id');
    this.api.GetUserData(this.value).subscribe((response) => {
      this.companydata = response;
      //  this.api.Getallcomapny().subscribe((response) => {
      //    this.companydata = response;
      var finaldata = this.companydata;
      // var finaldata = this.companydata.filter(
      //   (item: any) =>
      //     item.programStatus === 'Submitted' ||
      //     item.programStatus === 'Under Review' ||
      //     item.programStatus === 'Approved'
      // );
      this.finaldata = new MatTableDataSource<companymodel>(finaldata);
       this.finaldata.paginator = this._paginator;
       this.finaldata.sort = this._sort;
    });
  }

  routing(historyId: any) {
    localStorage.setItem('id', historyId);
    // this.api.GetCompanybycode(id);
    this.router.navigate(['/smeprogramcodepopup']);
    this.router.navigate(['/smeprogramcodepopup'], {
      state: { example: historyId },
    });
    //this.api.GetCompanybycode(id);
  }

  getDelayDays(endDate: Date): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = Math.floor(today.getTime() - end.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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



