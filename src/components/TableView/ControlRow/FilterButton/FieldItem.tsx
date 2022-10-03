import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { memo, useCallback, useMemo, useRef } from 'react';
import { HiTrash } from 'react-icons/hi';
import {
  EDataFilterConjunction,
  EDataFilterOperator,
  IProjectDataField,
} from '../../../../libs/client/types';
import DataFieldSelect from '../../../DataFieldSelect';
import { useFormatMessage } from '../../../hooks';

export interface IInnerFilter {
  field: IProjectDataField;
  operator: EDataFilterOperator;
  operand: string;
  conjunction: EDataFilterConjunction;
}

interface IFieldItemProps extends IInnerFilter {
  index: number;
  otherFields: IProjectDataField[];
  onChange: (index: number, filter: IInnerFilter) => void;
  onDelete: (index: number) => void;
}

function FieldItem(props: IFieldItemProps) {
  const {
    index,
    field,
    operator,
    operand,
    conjunction,
    otherFields,
    onChange,
    onDelete,
  } = props;
  const f = useFormatMessage();
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedFieldId = useMemo(() => field._id, [field]);
  const selectableFields = useMemo(
    () => [field, ...otherFields],
    [field, otherFields]
  );

  const handleDelete = () => {
    onDelete(index);
  };
  const handleOperandChange = useMemo(
    () =>
      debounce(() => {
        onChange(index, {
          field,
          operator,
          operand: inputRef.current?.value || '',
          conjunction,
        });
      }, 500),
    [onChange, index, field, operator, conjunction]
  );
  const handleFieldChange = useCallback(
    (fieldId: string) => {
      const newField = otherFields.find((el) => el._id === fieldId);
      if (newField && newField._id !== field._id) {
        onChange(index, {
          field: newField,
          operator,
          operand,
          conjunction,
        });
      }
    },
    [onChange, index, field, operator, operand, conjunction, otherFields]
  );

  const convertToOperatorMessage = useCallback(
    (op: EDataFilterOperator) => {
      const messages = {
        [EDataFilterOperator.Contain]: f('common.contain'),
        [EDataFilterOperator.Equal]: f('common.equal'),
      };
      return messages[op];
    },
    [f]
  );

  return (
    <li className="rounded-lg">
      <div
        className={classNames(
          'focus-within:bg-base-content/10',
          'rounded-lg pl-4 pr-2 py-2 flex items-center text-base-content'
        )}>
        <div className="flex-auto mr-2">
          <DataFieldSelect
            fields={selectableFields}
            value={selectedFieldId}
            onChange={handleFieldChange}
          />
        </div>
        <div className="flex-none mr-2">
          {convertToOperatorMessage(operator)}
        </div>
        <div className="w-24 flex-none mr-2">
          <input
            ref={inputRef}
            maxLength={128}
            className={classNames('input input-bordered input-sm', 'w-full')}
            defaultValue={operand}
            onChange={handleOperandChange}
          />
        </div>
        <button
          aria-label={f('common.delete')}
          className={classNames(
            'btn btn-sm btn-ghost text-error',
            'px-2 text-lg'
          )}
          onClick={handleDelete}>
          <HiTrash />
        </button>
      </div>
    </li>
  );
}

export default memo(FieldItem);
