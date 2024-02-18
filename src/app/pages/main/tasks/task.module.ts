
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { TaskService } from '../../../services/tasks/task.service';
import { TaskboardComponent } from './taskboard/taskboard.component';

export const routes: Routes = [{ path: '', component: TaskboardComponent }];

@NgModule({
  declarations: [TaskboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
  ],
  providers: [TaskService],
})
export class TasksModule {}
