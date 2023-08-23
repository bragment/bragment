import { HeaderContext } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { LuChevronsUpDown, LuKey, LuPin } from 'react-icons/lu';
import { IColumnHeaderMenuItem } from '../types';
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
  menuItems: IColumnHeaderMenuItem[];
  main?: boolean;
  Icon?: IconType;
}

function Header({ header, table, title, menuItems, main, Icon }: IHeaderProps) {
  const [opened, setOpened] = useState(false);
  const pinned = !!header.column.getIsPinned();
  const items = menuItems.filter(
    (item) =>
      !(typeof item.hidden === 'function'
        ? item.hidden(header, table)
        : item.hidden)
  );

  let EndIcon = pinned ? LuPin : LuChevronsUpDown;
  EndIcon = main ? LuKey : EndIcon;

  return (
    <div className="w-full">
      <DropdownMenu modal={false} open={opened} onOpenChange={setOpened}>
        <DropdownMenuTrigger asChild>
          <button
            className={clsx(
              'btn btn-ghost btn-sm',
              'no-shadow',
              'max-w-full',
              !items.length && 'pointer-events-none',
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
            {items.map((item) => (
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
