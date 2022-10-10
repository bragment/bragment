import { HiArrowRight } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import ResolverWrapper from '../../controls/ResolverWrapper';
import FieldRendererBase from '../FieldRendererBase';
import { EFieldCategory } from '../types';
import {
  getDefaultFieldType,
  getFieldRenderer,
  getProjectField,
} from '../utils';
import CreateFieldExtra from './CreateFieldExtra';

export default class ResolverFieldRenderer extends FieldRendererBase {
  public category = EFieldCategory.Advanced;
  public name = 'dataField.resolver';
  public type = EDataFieldType.Resolver;
  public Icon = HiArrowRight;

  public editable = false;

  // public getValue(field: IProjectDataField, record: IProjectDataRecord) {
  //   const relatedField = field.relatedField
  //     ? getProjectField(field.relatedField)
  //     : undefined;
  //   const relatedRenderer = relatedField
  //     ? getFieldRenderer(relatedField.type)
  //     : undefined;
  //   const relatedData = relatedRenderer?.getValue(field, record);
  //   if (
  //     !field.relatedField ||
  //     !field.subPath ||
  //     !relatedField ||
  //     !relatedRenderer ||
  //     !relatedData
  //   ) {
  //     return undefined;
  //   }
  //   if (field.subPath in (relatedData as IRecordFieldData)) {
  //     return (relatedData as IRecordFieldData)[field.subPath];
  //   }
  // }

  public renderTableBodyCell(
    field: IProjectDataField,
    record: IProjectDataRecord
  ) {
    const relatedField = field.relatedField
      ? getProjectField(field.relatedField)
      : undefined;
    const relatedRenderer = relatedField
      ? getFieldRenderer(relatedField.type)
      : undefined;
    const relatedData = relatedRenderer?.getData(field, record);
    const renderer = getFieldRenderer(field.asType || getDefaultFieldType());
    if (
      !field.relatedField ||
      !field.subPath ||
      !relatedField ||
      !relatedRenderer ||
      !relatedData ||
      !renderer
    ) {
      return <></>;
    }

    return (
      // TODO: resolve field
      <ResolverWrapper>
        {renderer.renderTableBodyCellByStringValue(relatedData.toString())}
      </ResolverWrapper>
    );
  }

  public renderCreateFieldExtra(props: {
    existingFields?: IProjectDataField[];
  }) {
    return <CreateFieldExtra {...props} />;
  }
}
