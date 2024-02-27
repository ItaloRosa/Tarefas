/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { TaskModel } from '../../pages/main/tasks/model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = environment.apiUrl;

  public $task = new BehaviorSubject<TaskModel | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(`${this.API}/tasks`);
  }

  updateTask(task: TaskModel): Observable<TaskModel | any> {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put(`${this.API}/tasks/${task.id}`, task, { headers })
  }

  postTask(task: TaskModel): Observable<TaskModel | any> {
    task.id = uuidv4();
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${this.API}/tasks`, task, { headers });
  }

  deleteTask(id: string): Observable<any> {
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    return this.httpClient.delete(`${this.API}/tasks/${id}`, { headers });
  }

  get$Task(): Observable<TaskModel | undefined> {
    return this.$task.asObservable();
  }

  set$Task(task: TaskModel) {
    this.$task.next(task);
  }

  unsubscribe$Task() {
    this.$task.unsubscribe();
  }
}
