import { HiOutlineTable, HiOutlineViewBoards } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { ILocalMessage } from '../../i18n/types';
import { EDataViewType } from '../../libs/client/types';

interface IDataViewConfig {
  type: EDataViewType;
  title: ILocalMessage;
  Icon: IconType;
}

export const dataViewTypes: IDataViewConfig[] = [
  {
    type: EDataViewType.Table,
    Icon: HiOutlineTable,
    title: 'dataView.table',
  },
  {
    type: EDataViewType.Board,
    Icon: HiOutlineViewBoards,
    title: 'dataView.board',
  },
];

export const dataViewTypeRecord = dataViewTypes.reduce((previous, current) => {
  previous[current.type] = current;
  return previous;
}, {} as Record<EDataViewType, IDataViewConfig>);
