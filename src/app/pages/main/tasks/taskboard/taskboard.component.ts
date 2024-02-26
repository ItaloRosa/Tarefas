import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TaskService } from '../../../../services/tasks/task.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskModel } from './../model/task.model';

@Component({
  selector: 'app-taskboard',
  standalone: false,
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.scss',
})
export class TaskboardComponent implements OnInit {

  todo: Array<TaskModel> = [];
  doing: Array<TaskModel> = [];
  done: Array<TaskModel> = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.todo = [];
        this.doing = [];
        this.done = [];

        if (res) {
          for (const item of res) {
            switch (item.status) {
              case 'TODO': this.todo.push(item)
                break;
              case 'DOING': this.doing.push(item)
                break;
              case 'DONE': this.done.push(item)
                break;
            }
          }
        }
      },
      error: () => {
        this.alert('error', 'Ocorreu um erro ao obter tarefas');
      }
    });
  }

  private statusTask(status: string): TaskStatusEnum {
    switch (status) {
      case 'todo': return TaskStatusEnum.TODO;
      case 'doing': return TaskStatusEnum.DOING;
      case 'done': return TaskStatusEnum.DONE;
      default: return TaskStatusEnum.TODO;
    }
  }

  updateStatusItem(items: TaskModel[], col: string) {
    const item = items[0];
    item.status = this.statusTask(col);
    this.taskService.updateTask(item).subscribe({
      error: () => {
        this.alert('error', 'Ocorreu um erro ao atualizar a tarefa.');
        this.getTasks();
      }
    });
  }

  newTask() {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      minWidth: '300px',
      minHeight: '300px',
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.postTask(result).subscribe({
          next: () => {
            this.alert('success', 'Tarefa criada com sucesso!');
            this.getTasks();
          },
          error: () => {
            this.alert('error', 'Ocorreu um erro ao criar a tarefa.');
          }
        });
      }
    });
  }

  editTask(task: TaskModel) {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      minWidth: '300px',
      minHeight: '300px',
      hasBackdrop: true,
      disableClose: false,
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.taskService.updateTask(result).subscribe({
          next: () => {
            this.alert('success', 'Tarefa editada com sucesso!');
            this.getTasks();
          },
          error: () => {
            this.alert('error', 'Ocorreu um erro ao editar a tarefa.');
          }
        });
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.alert('success', 'Tarefa excluída com sucesso!');
        this.getTasks();
      },
      error: () => {
        this.alert('error', 'Ocorreu um erro ao excluir a tarefa.');
      }
    });
  }

  private alert(type: 'error' | 'success', title: string, message?: string) {
    Swal.fire({
      icon: type,
      title,
      text: message,
    });
  }
}
