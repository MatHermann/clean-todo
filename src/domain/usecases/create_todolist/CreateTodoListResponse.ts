type CreateTodoListResponseTask = {
  label: string;
  isDone: boolean;
};

export type CreateTodoListResponse = {
  id: string;
  label: string;
  description: string;
  tasks: CreateTodoListResponseTask[];
  createdAt: Date;
  updatedAt: Date;
};
