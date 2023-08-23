import { HeaderContext } from '@tanstack/react-table';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { ICreateColumnListOptions } from '../types';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/libs/radix-ui/popover';

function AddColumn({
  project,
  view,
  CreateFieldForm,
}: ICreateColumnListOptions &
  HeaderContext<IProjectDataRecord, IRecordFieldData>) {
  const [opened, setOpened] = useState(false);
  const existingFields = useMemo(
    () => project.fields.filter((el) => el.model === view.model),
    [view.model, project.fields]
  );
  const handleFinish = useCallback(() => {
    setOpened(false);
  }, []);

  return (
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
                projectId={project._id}
                modelId={view.model}
                existingFields={existingFields}
                onFinish={handleFinish}
              />
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AddColumn;
