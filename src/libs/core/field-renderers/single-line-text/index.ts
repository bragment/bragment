import { LuType } from 'react-icons/lu';
import { registerFieldRenderer } from '../helpers';
import { EFieldCategory, IFieldRenderer } from '../types';
import { EDataFieldType } from '@/libs/client/types';

const renderer: IFieldRenderer = {
  key: 'dataField.singleLineText',
  type: EDataFieldType.SingleSelect,
  category: EFieldCategory.Basic,
  Icon: LuType,
};

registerFieldRenderer(renderer);

export default renderer;
