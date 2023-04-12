import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../RMCreateNewPopupComponent/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faHome, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch,faTrashAlt,faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { EditpopupComponent } from '../RMeditPopupComponent/editpopup.component';
import { EditassignmentComponent } from '../RMeditAssignmentComponent/editassignment.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  faTrashAlt = faTrashAlt;
  faPenSquare = faPenSquare;
  searchLeaveApplication: any;
  varCurrentUser: any;
  //searchStartDate: any;

  // faHome = faHome;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.varCurrentUser = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;
  // searchText:string='';

  ngOnInit(): void {
    this.LoadCompany();
    // this.router.navigate(['/header'], { state: { name: this.varCurrentUser } });
  }
  saveData() {
    const searchStartDate = this.datePipe.transform(
      this.searchLeaveApplication.startDate,
      'yyyy-MM-dd'
    );
    // handle the rest
  }

  isResourceOrSmepage() {
    const currentRoute = this.router.url;
    return currentRoute == '/resource' || currentRoute == '/SME';
  }

  displayColums: string[] = [
    'vamid',
    'resourceName',
    'manager',
    'techTrack',
    'startDate',
    'endDate',
    'sme',
    'action',
  ];


  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.Getallcomapny().subscribe((response) => {
      this.companydata = response;
      this.finaldata = new MatTableDataSource<companymodel>(this.companydata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    alertify.confirm(
      'Delete Assignment',
      'Do you want delete the assignment?',
      () => {
        this.api.RemoveCompanybycode(id).subscribe((r) => {
          this.LoadCompany();
        });
      },
      function () {}
    );
  }
  routing(id: any) {
    localStorage.setItem('id', id);
    // this.api.GetCompanybycode(id);
    this.router.navigate(['/editassignment']);
    this.router.navigate(['/editassignment'], { state: { example: id } });
    //this.api.GetCompanybycode(id);
  }

  // onSearchTextEntered(searchValue:string){
  //   this.searchText=searchValue;
  //   console.log(this.searchText);
  // }

  // filterData($event:any){
  //  this.finaldata.filter = $event.target.searchValue;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}
