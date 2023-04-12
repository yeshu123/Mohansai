import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { faUser,faBars } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css'],
})
export class Header1Component implements OnInit {
  faHome = faHome;
  faUser = faUser;
  faBars = faBars;
  faListUl = faListUl;
  collapsed = true;
  name: any;

  constructor(private router: Router, private api: ApiService) {}
  isResourceOrSmepage() {
    const currentRoute = this.router.url;
    return currentRoute == '/resource' || currentRoute == '/SME';
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('currentUser');
      //  console.log(this.name);
    // this.api.getUsers().subscribe({
    //   next: (data: any[]) => {
    //     this.name = data[1].name;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }
}
