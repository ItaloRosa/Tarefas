import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ButtonComponent } from './button/button.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { TableComponent } from './table/table.component';
import { HighlightMouseDirective } from './directivies/highlight-mouse.directive';

@NgModule({
  declarations: [ButtonComponent, TableComponent, DragAndDropComponent, HighlightMouseDirective],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [ButtonComponent, TableComponent, DragAndDropComponent,]
})
export class SharedModule { }
