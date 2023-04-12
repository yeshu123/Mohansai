import { Component } from '@angular/core';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { MBSC_OPTIONS } from '@mobiscroll/angular';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Program management';
  faHome = faHome;
  showheader = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.url == '/' ||
          val.url == '/login' ||
          val.url == '/Registration'
        ) {
          this.showheader = false;
        } else {
          this.showheader = true;
        }
      }
    });
  }

  //    navMenu: MBSC_OPTIONS = {

  //     type: 'hamburger',
  //     responsive: {
  //         medium: {
  //             type: 'tab'
  //         }
  //     }
  // };
}
