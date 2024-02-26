import { TaskStatusEnum } from "../enums/task-status.enum";

export interface TaskModel {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  tags: Array<string>;
  responsavel: string;
  status: TaskStatusEnum;
}
