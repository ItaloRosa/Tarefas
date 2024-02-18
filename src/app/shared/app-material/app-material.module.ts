import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    DragDropModule,
    MatMenuModule,
    MatInputModule,
		MatFormFieldModule,
    MatSnackBarModule,
  ],
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
})
export class AppMaterialModule {}
