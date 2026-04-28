export type Lists = {
  [x in string]: string[];
};

// aka list-of-lists to map a name
// (ex. "accepted"/"denied") to a list of words
export type MapLists = {
  lists: {
    [key in string]: Lists;
  };
};

export type Result = {
  title: string;
  lists: Lists;
};

export type ResponseData<T> = {
  results: T[];
  count: number;
  message?: string;
};

export type ErrorMessage<T> = Pick<ResponseData<T>, "message">;
