import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  ngOnInit(): void {}

  success: string = '';

  myForm = this.fb.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    job_title: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    public service: EmployeeService
  ) {}

  onNoClick(): void {
    this.dialog.closeAll();
  }

  createEmployee(values: {
    name: string;
    last_name: string;
    job_title: string;
    email: string;
  }) {
    console.log(values);
    this.http
      .post(
        'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/',
        values
      )
      .subscribe((res) => {
        this.service.loadData();
        console.log(res);
        this.myForm.reset();
        this.success =
          "Un nouvel employé a été ajouté à la liste. Si vous souhaitez en ajouter d'autres, veuillez effectuer de nouveau l'opération.";
        console.log(this.success);
      });
  }
}
