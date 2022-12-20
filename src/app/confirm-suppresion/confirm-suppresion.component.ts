import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-suppresion',
  templateUrl: './confirm-suppresion.component.html',
  styleUrls: ['./confirm-suppresion.component.css'],
})
export class ConfirmSuppresionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public service: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  delete() {
    console.log(this.data.id);
    this.service.deleteData(this.data.id);
    this.dialog.closeAll();
  }

  closeSuppressionDialog() {
    this.dialog.closeAll();
  }
}
