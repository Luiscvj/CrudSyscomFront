import { Component, Inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
MAT_DIALOG_DATA,
MatDialogRef,
MatDialogTitle,
MatDialogContent,
MatDialogActions,
MatDialogClose,
MatDialogModule,
} from '@angular/material/dialog';
import {
  FormsModule,  
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,} from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AddBookDto } from '../../../Core/Models/Book/BookDTOS/AddBookDto';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {


  constructor
  (
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddBookDto
  )
  { }

  onNoClick(): void
  {
    this.dialogRef.close();
  }

}
