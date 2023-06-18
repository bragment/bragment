import clsx from 'clsx';
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDialogStore, useFormatMessage } from '../hooks';
import { IModelViewGroup } from './types';
import { Avatar, AvatarFallback } from '@/libs/radix-ui/avatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/libs/radix-ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/libs/radix-ui/popover';
import { ScrollArea } from '@/libs/radix-ui/scroll-area';
import { getProjectDataViewPath } from '@/routes/helpers';
import { useNavigateToPage } from '@/routes/hooks';
import { getFirstChar } from '@/utils';

function DataViewSwitcher(props: { modelViewGroups: IModelViewGroup[] }) {
  const { modelViewGroups } = props;
  const f = useFormatMessage();
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const { toastInfo } = useDialogStore();
  const [opened, setOpened] = useState(false);
  const navigateTo = useNavigateToPage();
  const currentView = useMemo(() => {
    for (const group of modelViewGroups) {
      for (const view of group.views) {
        if (view._id === viewId) {
          return view;
        }
      }
    }
  }, [modelViewGroups, viewId]);

  const selectDataView = useCallback(
    (_modelId: string, _viewId: string) => {
      setOpened(false);
      if (_modelId !== modelId || _viewId !== viewId) {
        navigateTo(getProjectDataViewPath(projectId, _modelId, _viewId));
      }
    },
    [projectId, modelId, viewId, navigateTo]
  );

  const createDataView = useCallback(() => {
    setOpened(false);
    toastInfo(f('common.underConstruction'));
  }, [f, toastInfo]);

  return (
    <Popover open={opened} onOpenChange={setOpened}>
      <PopoverTrigger asChild>
        <button
          className={clsx(
            'btn btn-ghost border-base-content/20 hover:border-transparent no-shadow',
            'w-56',
            opened && 'bg-base-content/20 border-transparent'
          )}>
          <div className="w-full flex items-center">
            <Avatar className="flex-none w-7 h-7 mr-2">
              <AvatarFallback className="bg-secondary text-secondary-content">
                {getFirstChar(currentView?.title || '')}
              </AvatarFallback>
            </Avatar>
            <div
              className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap text-left"
              title={currentView?.title}>
              {currentView?.title}
            </div>
            <ChevronsUpDownIcon className="flex-none h-5 w-5 opacity-50 ml-2" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56">
        <Command>
          <CommandList>
            <div className="px-2">
              <CommandInput placeholder={f('common.search')} />
            </div>

            <CommandEmpty>{f('project.noViewsFound')}</CommandEmpty>
            <ScrollArea
              className="px-2"
              viewportClassName="max-h-56"
              verticalBarClassName="w-2"
              vertical>
              {modelViewGroups
                .filter((group) => group.views.length > 0)
                .map((group) => (
                  <CommandGroup
                    key={group.model._id}
                    heading={group.model.title}
                    className="[&_[cmdk-group-heading]]:w-52">
                    {group.views.map((view) => (
                      <CommandItem
                        key={view._id}
                        className={'text-sm'}
                        value={view._id}
                        onSelect={selectDataView.bind(
                          undefined,
                          group.model._id,
                          view._id
                        )}>
                        {view.title}
                        <CheckIcon
                          className={clsx(
                            'ml-auto h-4 w-4',
                            view._id === viewId ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              <div className="h-2" />
            </ScrollArea>
          </CommandList>
          <CommandSeparator className="mx-2" />
          <CommandList className="px-2">
            <CommandGroup>
              <CommandItem className="h-11 my-2" onSelect={createDataView}>
                <PlusCircleIcon className="mr-2 h-6 w-6" />
                {f('project.addView')}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default observer(DataViewSwitcher);
