import { Component, OnInit } from '@angular/core';
import { faHome,faUser,faListUl } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-associate-header',
  templateUrl: './associate-header.component.html',
  styleUrls: ['./associate-header.component.css'],
})
export class AssociateHeaderComponent implements OnInit {
  faHome = faHome;
  faUser = faUser;
  faListUl = faListUl;
  collapsed = true;
  name: any;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    let name = sessionStorage.getItem('currentUser');
    console.log(name);
  }
}

