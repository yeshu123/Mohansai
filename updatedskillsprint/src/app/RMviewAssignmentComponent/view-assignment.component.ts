import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../RMCreateNewPopupComponent/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { CommentpopupComponent } from '../SMEcommentPopupComponent/commentpopup.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css'],
})
export class ViewAssignmentComponent implements OnInit {
  faSearch = faSearch;
  faHome = faHome;

  constructor(private dialog: MatDialog, private api: ApiService) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;

  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = [
    'vamid',
    'resourceName',
    'techTrack',
    'startDate',
    'endDate',
    'sme',
    'Delaydays',
    'comments',
  ];

  Openpopup(id: any) {
    const _popup = this.dialog.open(CommentpopupComponent, {
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

  getDelayDays(endDate: Date): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = Math.floor(today.getTime() - end.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
  }
}
