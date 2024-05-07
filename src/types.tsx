export type JokesData = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export type FormJokesInfo = {
  columnName: string[];
};

export type JokesContextType = {
  data: JokesData[];
  setData: React.Dispatch<React.SetStateAction<JokesData[]>>;
};
