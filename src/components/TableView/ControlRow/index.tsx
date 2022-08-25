import classNames from 'classnames';
import { memo } from 'react';
import { SearchInput } from './SearchInput';

interface IControlRowProps {
  onSearchInputChange: (value: string) => void;
}

export function ControlRow(props: IControlRowProps) {
  const { onSearchInputChange } = props;
  return (
    <div
      className={classNames(
        'bg-base-200 border-base-300',
        'sticky left-0 top-0 z-40',
        'h-12 border-t',
        'flex items-center pl-2'
      )}>
      <SearchInput onChange={onSearchInputChange} />
    </div>
  );
}

export default memo(ControlRow);
