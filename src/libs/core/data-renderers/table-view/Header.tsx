import { HeaderContext } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { LuChevronsUpDown, LuPin } from 'react-icons/lu';
import { ITableHeaderMenuItem } from './types';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/libs/radix-ui/dropdown-menu';

interface IHeaderProps
  extends HeaderContext<IProjectDataRecord, IRecordFieldData> {
  title: string;
  menuItems: ITableHeaderMenuItem[];
  Icon?: IconType;
}

function Header({ header, table, title, menuItems, Icon }: IHeaderProps) {
  const [opened, setOpened] = useState(false);
  const pinned = !!header.column.getIsPinned();
  const EndIcon = pinned ? LuPin : LuChevronsUpDown;

  return (
    <div className="w-full">
      <DropdownMenu open={opened} onOpenChange={setOpened}>
        <DropdownMenuTrigger asChild>
          <button
            className={clsx(
              'btn btn-ghost btn-sm',
              'no-shadow',
              'max-w-full',
              opened && 'bg-base-content/20'
            )}>
            <div className="max-w-full flex flex-row gap-1">
              {Icon && <Icon className="flex-none" />}
              <div className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </div>
              {<EndIcon className="flex-none opacity-50" />}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <ul
            className={clsx(
              'menu bg-base-100',
              'w-40 p-2 shadow',
              '[&>li>*]:!bg-transparent'
            )}>
            {menuItems
              .filter(
                (item) =>
                  !(typeof item.hidden === 'function'
                    ? item.hidden(header, table)
                    : item.hidden)
              )
              .map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  className={item.className}
                  disabled={
                    typeof item.disabled === 'function'
                      ? item.disabled(header, table)
                      : item.disabled
                  }
                  onSelect={item.onSelect?.bind(undefined, header, table)}
                  asChild>
                  <li>
                    <div>
                      {item.Icon && <item.Icon className="opacity-50" />}
                      {item.title}
                    </div>
                  </li>
                </DropdownMenuItem>
              ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
