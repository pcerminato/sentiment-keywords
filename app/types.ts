export type Result = {
  title: string;
  lists: {
    accepted: string[];
    denied: string[];
  };
};

export type ResponseData<T> = {
  results: T[];
  count: number;
  message?: string;
};

export type ErrorMessage<T> = Pick<ResponseData<T>, "message">;

export type Lists = Result["lists"];

export type MapList = {
  [key in string]: string[];
};

export type MapLists = {
  lists: {
    accepted: MapList;
    denied: MapList;
  };
};
