export type URLRecord = {
  id: string;
  originURL: string;
  shortURL: string;
  urlCode: string;
  updatedAt: string;
  createdAt: string;
};

export type APIResponse = {
  message: string;
  data?: string | URLRecord;
};
