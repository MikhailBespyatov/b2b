export interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: unknown;
  grid?: number;
}

export interface IProps {
  dataSource: any[];
  columns: IColumn[];
  limit: number;
  width?: string;
  isLoading?: boolean;
}
