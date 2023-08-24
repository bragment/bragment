import { HeaderContext } from '@tanstack/react-table';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { ICreateColumnListOptions } from '../types';
import { IProjectDataRecord } from '@/libs/client/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/libs/radix-ui/popover';

function AddColumn({
  project,
  view,
  model,
  CreateFieldForm,
}: ICreateColumnListOptions & HeaderContext<IProjectDataRecord, unknown>) {
  const [opened, setOpened] = useState(false);
  const handleFinish = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <div className="text-center">
      <Popover open={opened} onOpenChange={setOpened}>
        <PopoverTrigger asChild>
          <button
            className={clsx(
              'btn btn-ghost btn-sm btn-square',
              'no-shadow',
              opened && 'bg-base-content/20'
            )}>
            <LuPlus className="text-lg" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className={clsx('card bg-base-100', 'w-80 shadow')}>
            <div className="card-body">
              {CreateFieldForm && (
                <CreateFieldForm
                  project={project}
                  model={model}
                  view={view}
                  onFinish={handleFinish}
                />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AddColumn;
