import { HiArrowRight } from 'react-icons/hi';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import ResolverWrapper from '../../controls/ResolverWrapper';
import { EFieldCategory } from '../../types';
import {
  getDefaultFieldType,
  getFieldRenderer,
  getProjectField,
} from '../../utils';
import FieldRendererBase from '../FieldRendererBase';
import CreateFieldExtra from './CreateFieldExtra';

export default class ResolverFieldRenderer extends FieldRendererBase {
  static SEPARATOR = '.';
  public category = EFieldCategory.Advanced;
  public name = 'dataField.resolver';
  public type = EDataFieldType.Resolver;
  public Icon = HiArrowRight;

  public editable = false;

  public resolve<T = any>(relatedData: any, subPath: string): T | undefined {
    if (relatedData) {
      if (subPath in relatedData) {
        return relatedData[subPath];
      }
      const index = subPath.indexOf(ResolverFieldRenderer.SEPARATOR);
      if (index > -1) {
        const key = subPath.slice(0, index);
        const newSubPath = subPath.slice(index + 1);
        const newRelatedData = relatedData[key];
        if (relatedData[key]) {
          return this.resolve<T>(newRelatedData, newSubPath);
        }
      }
    }
    return undefined;
  }

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
    const renderer = getFieldRenderer(field.asType || getDefaultFieldType());
    if (
      !field.relatedField ||
      !field.subPath ||
      !relatedField ||
      !relatedRenderer ||
      !renderer
    ) {
      return <></>;
    }
    const relatedData = relatedRenderer.getData(relatedField, record);
    const value = this.resolve(relatedData, field.subPath);

    if (typeof value === 'string') {
      return (
        <ResolverWrapper relatedField={relatedField} relatedRecord={record}>
          {renderer.renderTableBodyCellByStringValue(value)}
        </ResolverWrapper>
      );
    }
    return <></>;
  }

  public renderCreateFieldExtra(props: {
    existingFields?: IProjectDataField[];
  }) {
    return <CreateFieldExtra {...props} />;
  }
}
