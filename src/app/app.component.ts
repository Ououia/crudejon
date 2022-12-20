import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ConfirmSuppresionComponent } from './confirm-suppresion/confirm-suppresion.component';
import { EmployeeService } from './employee.service';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'ecf-jon';
  status: any;
  errorMessage: any;
  employees: any;
  @Input()
  employeeId: number = 0;

  constructor(
    public service: EmployeeService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.service.loadData();
  }

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  confirmSuppresion(id: number) {
    console.log(id);
    this.dialog.open(ConfirmSuppresionComponent, {
      data: { id },
    });
  }

  editEmployee(employee: any) {
    this.dialog.open(EditEmployeeComponent, {
      data: { employee },
    });
  }

  delete(id: number) {
    console.log(id);
    this.http
      .delete(
        'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/' + id
      )
      .subscribe({
        next: (data) => {
          console.log('Delete successful');
          this.service.loadData();
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
