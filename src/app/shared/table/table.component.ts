import { Component, Input } from '@angular/core';
import { TaskModel } from '../../pages/main/tasks/model/task.model';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: Array<TaskModel> = [];
  displayedColumns: string[] = ['titulo', 'responsavel', 'tags', 'dataCriacao'];
}
