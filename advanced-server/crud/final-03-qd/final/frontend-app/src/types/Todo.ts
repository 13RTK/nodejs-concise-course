export type Todo = {
  id: number;
  title: string;
  tag: string;
};

export type TodoDetail = Todo & {
  content: string;
};
