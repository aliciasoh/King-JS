import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DataKing } from 'src/app/models/data-king.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  allData: DataKing[];
  isNight;
  displayedColumns: string[] = ['id', 'status', 'createdOn', 'name', 'description', 'delta'];
  dataSource = new MatTableDataSource<DataKing>(this.allData);

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(
    private dataService: DataService
  ) {
    this.isNight = (new Date()).getHours() >= 6 && (new Date()).getHours() <= 17 ? false : true;
    this.dataService.getAllData().subscribe(response=>{
      this.allData = response;
      this.dataSource = new MatTableDataSource<DataKing>(this.allData);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
      };
    })
   }

  ngOnInit() {
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
