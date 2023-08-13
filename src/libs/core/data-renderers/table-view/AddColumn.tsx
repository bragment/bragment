import clsx from 'clsx';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/libs/radix-ui/popover';

interface IAddColumnProps {
  title: string;
}

function AddColumn({ title }: IAddColumnProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover open={opened} onOpenChange={setOpened}>
      <PopoverTrigger asChild>
        <button
          title={title}
          className={clsx(
            'btn btn-ghost btn-sm btn-square',
            'no-shadow',
            opened && 'bg-base-content/20'
          )}>
          <LuPlus className="text-lg" />
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
  );
}

export default AddColumn;
