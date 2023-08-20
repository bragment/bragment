import { LuType } from 'react-icons/lu';
import { registerFieldRenderer } from '../helpers';
import { EFieldCategory, IFieldRenderer } from '../types';
import { EDataFieldType } from '@/libs/client/types';

const renderer: IFieldRenderer = {
  type: EDataFieldType.SingleLineText,
  category: EFieldCategory.Basic,
  Icon: LuType,
};

registerFieldRenderer(renderer);

export default renderer;
