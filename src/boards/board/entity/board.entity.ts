export interface Board {
  id: string;
  title: string;
  description: string,
  writer: string;
  date: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
