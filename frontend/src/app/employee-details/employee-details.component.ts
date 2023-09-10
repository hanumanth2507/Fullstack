import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'employee_code', 'full_name', 'designation', 'available_status'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.employeesDetails().subscribe(result => {
      if (result.success) {
        console.log(result.data);
        alert(result.message);
        // Assuming the data is returned in `result.data.rows` array
        this.dataSource.data = result.data.rows;
      } else {
        alert(result.message);
      }
    });
  }

  ngAfterViewInit() {
    // Set the paginator and sort for the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const selectedOption = filterValue.toLowerCase();
  
      if (selectedOption === 'active') {
        return data.available_status.toLowerCase() === 'active';
      } else if (selectedOption === 'inactive') {
        return data.available_status.toLowerCase() === 'inactive';
      }
  
      return true;
    };
  
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  calculatePosition(index: number): number {
    const pageIndex = this.dataSource.paginator?.pageIndex || 0;
    const pageSize = this.dataSource.paginator?.pageSize || 0;
    return (pageIndex * pageSize) + (index + 1);
  }
}