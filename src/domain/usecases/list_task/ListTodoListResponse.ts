type ListTodoListResponseTask = {
  label: string;
  isDone: boolean;
};

type ListTodoListResponseTodoList = {
  id: string;
  label: string;
  description: string;
  tasks: ListTodoListResponseTask[];
  createdAt: Date;
  updatedAt: Date;
};

export type ListTodoListResponse = {
  page: number;
  itemsPerPage: number;
  todoLists: ListTodoListResponseTodoList[];
};
