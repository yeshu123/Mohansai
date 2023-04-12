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
import { faSearch,faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProgramComponent } from '../SMEComponent/program.component';

@Component({
  selector: 'app-company',
  templateUrl: './smeviewcomponent.component.html',
  styleUrls: ['./smeviewcomponent.component.css'],
})
export class SmeviewcomponentComponent implements OnInit {
  faHome = faHome;
  faSearch = faSearch;
  faPenSquare = faPenSquare;
  searchLeaveApplication: any;
  currentLogInsme: any;
  name: any;
  //searchStartDate: any;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    public router: Router,
    private datePipe: DatePipe
  ) {
    this.currentLogInsme = this.router.getCurrentNavigation()?.extras.state;
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;
  // searchText:string='';

  ngOnInit(): void {
    this.LoadCompany();
       let name = sessionStorage.getItem('currentUser');
        // this.api.getUsers().subscribe({
        //   next: (data: any[]) => {
        //     this.name = data[1].name;
        //   },
        //   error: (error) => {
        //     console.log(error);
        //   },
        // });
  }
  saveData() {
    const searchStartDate = this.datePipe.transform(
      this.searchLeaveApplication.startDate,
      'yyyy-MM-dd'
    );
    // handle the rest
  }

  displayColums: string[] = [
    'vamid',
    'resourceName',
    'manager',
    'techTrack',
    // 'category',
    'startDate',
    'endDate',
    'sme',
    'action',
  ];

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
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
      var finaldata = this.companydata.filter(
          (item: any) => item.sme === this.currentLogInsme.name
       );
      this.finaldata = new MatTableDataSource<companymodel>(finaldata);
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
    this.router.navigate(['/program',id]);
    this.router.navigate(['/program',id], { state: { example: id } });
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
