import { HeaderContext } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { HiMiniChevronUpDown } from 'react-icons/hi2';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/libs/radix-ui/popover';

interface IHeaderProps
  extends HeaderContext<IProjectDataRecord, IRecordFieldData> {
  title: string;
}

function Header({ title }: IHeaderProps) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="w-full">
      <Popover open={opened} onOpenChange={setOpened}>
        <PopoverTrigger asChild>
          <button
            className={clsx(
              'btn btn-ghost btn-sm',
              'no-shadow',
              'max-w-full',
              opened && 'bg-base-content/20'
            )}>
            <div className="max-w-full flex flex-row gap-1">
              <HiMiniChevronUpDown className="flex-none opacity-50" />
              <div className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </div>
              <HiMiniChevronUpDown className="flex-none opacity-50" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <ul className={clsx('menu bg-base-100', 'w-52 p-2 shadow')}>
            <li>
              <div>Item 1</div>
            </li>
            <li>
              <div>Item 2</div>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Header;
