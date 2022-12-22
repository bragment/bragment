import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../client/types';

export interface IViewProps {
  modelFields: IProjectDataField[];
  modelRecords: IProjectDataRecord[];
}

export interface IFieldProps {
  recordId: string;
  fieldId: string;
  data?: IRecordFieldData;
}

export interface IControlProps {
  className?: string;
  active?: boolean;
  editing?: boolean;
  loading?: boolean;
  bordered?: boolean;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}
