
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TaskService } from '../../../services/tasks/task.service';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';
import { TaskboardComponent } from './taskboard/taskboard.component';

export const routes: Routes = [{ path: '', component: TaskboardComponent }];

@NgModule({
  declarations: [ TaskboardComponent, DialogTaskComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ],
  providers: [ TaskService ],
})
export class TasksModule { }
