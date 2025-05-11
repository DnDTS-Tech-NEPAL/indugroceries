export type AxiosErrorResponseType = {
  config: {
    headers: Record<string, string>;
    _retry?: boolean;
  };
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};
