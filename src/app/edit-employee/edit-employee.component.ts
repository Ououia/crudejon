import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employee: any },
    public http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public service: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log(this.data.employee.id);
    console.log(this.editForm.value);
  }

  editForm = this.fb.group({
    name: [this.data.employee.name, Validators.required],
    last_name: [this.data.employee.last_name, Validators.required],
    job_title: [this.data.employee.job_title, Validators.required],
    email: [
      this.data.employee.email,
      Validators.compose([Validators.email, Validators.required]),
    ],
  });

  editEmployee(values: {
    name: string;
    last_name: string;
    job_title: string;
    email: string;
  }) {
    console.log(values);
    this.http
      .put(
        'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/' +
          this.data.employee.id,
        values
      )
      .subscribe((res) => {
        this.service.loadData();
        console.log(res);
        this.dialog.closeAll();
        // this.success = 'Success! Repeat to add more employees';
        // console.log(this.success);
      });
  }
}
