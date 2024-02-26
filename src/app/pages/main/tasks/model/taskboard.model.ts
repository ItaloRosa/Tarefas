import { TaskModel } from "./task.model";

export interface TaskboardModel {
  todo?: TaskModel[];
  doing?: TaskModel[];
  done?: TaskModel[];
}
