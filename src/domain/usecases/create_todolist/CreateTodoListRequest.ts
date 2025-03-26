type CreateTodoListRequestTask = {
  label: string;
  isDone: boolean;
};

export type CreateTodoListRequest = {
  label: string;
  description: string;
  tasks: CreateTodoListRequestTask[];
}
