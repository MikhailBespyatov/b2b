export interface THeadItems {
  title: string;
  grid?: number;
  key: string;
}

export interface Props {
  tHeadItems: THeadItems[];
  data: any[];
  width?: string;
  isFetching: boolean;
  limit: number;
}
