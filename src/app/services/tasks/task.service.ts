import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../../pages/main/tasks/model/task.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = 'http://localhost:3000/tasks/';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.API)
    .pipe(
      tap(list => list.map((i) => i.dataCriacao = new Date))
    );
  }
}
