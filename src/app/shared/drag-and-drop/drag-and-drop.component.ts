import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../pages/main/tasks/model/task.model';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {

  @Input() todo: Array<TaskModel> = [];
  @Input() doing: Array<TaskModel> = [];
  @Input() done: Array<TaskModel> = [];

  @Output() dropAction: EventEmitter<{items: TaskModel[], toColumn: string}> = new EventEmitter();
  @Output() edit: EventEmitter<TaskModel> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() { }

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

      this.dropAction.emit({
        items: event.container.data,
        toColumn: event.container.id
      });
    }
  }

  editItem(item: TaskModel) {
    this.edit.emit(item);
  }

  deleteItem(id: string) {
    this.delete.emit(id);
  }
}
