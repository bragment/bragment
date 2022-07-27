import {
  HiAnnotation,
  HiCalendar,
  HiDocumentText,
  HiHashtag,
} from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { ILocalMessage } from '../../i18n/types';
import { EDataFieldType } from '../../libs/client/types';

interface IDataFieldConfig {
  type: EDataFieldType;
  title: ILocalMessage;
  Icon: IconType;
}

export const dataFieldTypes: IDataFieldConfig[] = [
  {
    type: EDataFieldType.SingleLineText,
    Icon: HiAnnotation,
    title: 'dataField.singleLineText',
  },
  {
    type: EDataFieldType.MultiLineText,
    Icon: HiDocumentText,
    title: 'dataField.multiLineText',
  },
  {
    type: EDataFieldType.Number,
    Icon: HiHashtag,
    title: 'dataField.number',
  },
  {
    type: EDataFieldType.DateTime,
    Icon: HiCalendar,
    title: 'dataField.dateTime',
  },
];

export const dataFieldTypeRecord = dataFieldTypes.reduce(
  (previous, current) => {
    previous[current.type] = current;
    return previous;
  },
  {} as Record<EDataFieldType, IDataFieldConfig>
);
