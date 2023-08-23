import { LuTable } from 'react-icons/lu';
import { registerViewRenderer } from '../helpers';
import { IViewRenderer } from '../types';
import TableView from './TableView';
import { EDataViewType } from '@/libs/client/types';

const renderer: IViewRenderer = {
  type: EDataViewType.Table,
  Icon: LuTable,
  View: TableView,
};

registerViewRenderer(renderer);

export default renderer;
