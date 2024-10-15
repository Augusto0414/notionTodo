export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  POR_HACER = "Por hacer",
  EN_PROCESO = "En proceso",
  COMPLETADAS = "Completadas",
  BLOQUEADAS = "Bloqueadas",
}
