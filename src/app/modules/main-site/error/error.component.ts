import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorData: string = '/assets/mddocs/error.md';
  
  constructor() { }

  ngOnInit() {
  }

}
