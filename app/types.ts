export type Result = {
  title: string;
  lists: {
    accepted: string[];
    denied: string[];
  };
};

export type ResponseData = {
  results: Result[];
  count: number;
  message?: string;
};
