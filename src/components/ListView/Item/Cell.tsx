import classNames from 'classnames';
import { memo } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../libs/client/types';
import { getFieldRenderer } from '../../../libs/fields';
import styles from '../index.module.scss';

interface IItermProps {
  projectId: string;
  field: IProjectDataField;
  record: IProjectDataRecord;
  data?: IRecordFieldData;
  className?: string;
  main?: boolean;
}

function Cell(props: IItermProps) {
  const { field, record, className, main } = props;
  const renderer = getFieldRenderer(field.type);

  return (
    <div className={classNames(className, styles.cell)}>
      <div className={styles.content}>
        {renderer && renderer.renderListItemCell(field, record, main)}
      </div>
    </div>
  );
}

export default memo(Cell);
