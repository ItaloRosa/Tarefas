import { Component, computed, effect, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  taskList = signal<string[]>([]);
  taskCount = computed(()=> this.taskList().length);
  message = '';

  constructor() {
    effect(() => this.message = `Task Add ${this.taskList()} - Total = ${this.taskCount()}`);
  }

  submit(taskName: string) {
    //this.taskList.mutate(()=> this.taskList().push(taskName));
    this.taskList.update(()=> [...this.taskList(), taskName]);
  }
}
