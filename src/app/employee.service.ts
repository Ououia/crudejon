import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public employees: any;
  errorMessage: any;
  constructor(private http: HttpClient) {}

  loadData() {
    return this.http
      .get<any>('https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees')
      .subscribe({
        next: (data) => {
          this.employees = data;
          console.log(this.employees);
        },
      });
  }

  deleteData(id: any) {
    this.http
      .delete(
        'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/' + id
      )
      .subscribe({
        next: (data) => {
          console.log('Delete successful');
          this.loadData();
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
