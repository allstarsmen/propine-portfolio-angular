import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './services/app.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'propine-portfolio-angular';
  displayedColumns: string[] = ['position', 'name', 'amount', 'holdings', 'date'];
  dataSource = new MatTableDataSource();

  constructor(
    private appService: AppService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData()
  }

  private getData(date: string = '') {
    this.appService.getBalances(date).subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter(event: MatDatepickerInputEvent<any>) {
    this.getData(moment(event.value).format('YYYY-MM-DD'))
  }
}
