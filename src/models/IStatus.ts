import { OptionShape } from '@alfalab/core-components/select';

export interface IStatus {
  id: number;
  value: string;
  textRu: string;
}

export interface IStatusOption extends OptionShape {
  values: string[];
}
