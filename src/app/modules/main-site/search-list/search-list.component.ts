import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  searchlist: any[] = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}
