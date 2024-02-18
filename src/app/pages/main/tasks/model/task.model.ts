export interface TaskModel {
  _id: string;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  tags: Array<string>;
  responsavel: string;
  status: 'TODO' | 'DOING' | 'DONE';
}
