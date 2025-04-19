export type RequestsHistoryItem = {
  dateTime: string;
  url: string;
  status: string;
  response: string;
};

export type ExpressionsHistoryItem = {
  dateTime: string;
  expression: string;
};

export interface HistoryContainerProps {
  setResource: (value: string) => void;
  setUrl: (value: string) => void;
  setExpression: (value: string) => void;
  copyToClickboard: (
    toCopy: string,
    successMessage: string,
    errorMessage: string
  ) => void;
}

export interface RequestHistoryTableProps {
  setResource: (value: string) => void;
  setUrl: (value: string) => void;
  copyToClickboard: (
    toCopy: string,
    successMessage: string,
    errorMessage: string
  ) => void;
}

export interface ExpressionsHistoryTableProps {
  setExpression: (value: string) => void;
  copyToClickboard: (
    toCopy: string,
    successMessage: string,
    errorMessage: string
  ) => void;
}
