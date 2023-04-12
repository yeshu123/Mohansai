import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search1',
  templateUrl: './search1.component.html',
  styleUrls: ['./search1.component.css'],
})
export class Search1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
}
