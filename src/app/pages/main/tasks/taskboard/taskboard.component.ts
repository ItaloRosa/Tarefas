import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../model/task.model';
import { TaskService } from '../../../../services/tasks/task.service';

@Component({
  selector: 'app-taskboard',
  standalone: false,
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.scss',
})
export class TaskboardComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'responsavel', 'tags', 'dataCriacao'];
  protected tasks: Array<TaskModel>;

  todo: Array<TaskModel> = [];
  doing: Array<TaskModel> = [];
  done: Array<TaskModel> = [];

  constructor(private taskService: TaskService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      console.log(res);
      this.tasks = res;
      this.todo = res;
    });
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
