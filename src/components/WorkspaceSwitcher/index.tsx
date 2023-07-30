import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { HiCheck, HiChevronDown, HiPlusCircle } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { useDialogStore, useFormatMessage, useUserStore } from '../hooks';
import { IWorkspace } from '@/libs/client/types';
import { Avatar, AvatarFallback } from '@/libs/radix-ui/avatar';
import {
  Command,
  CommandGroup,
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
import { useMyWorkspaceListQuery } from '@/libs/react-query';
import { getWorkspaceInstancePath } from '@/routes/helpers';
import { useNavigateToPage } from '@/routes/hooks';
import { getFirstChar } from '@/utils';

function WorkspaceSwitcher() {
  const f = useFormatMessage();
  const { workspaceId = '' } = useParams();
  const { me } = useUserStore();
  const { toastInfo } = useDialogStore();
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);
  const [opened, setOpened] = useState(false);
  const navigateTo = useNavigateToPage();
  const currentWorkspace = workspaces?.find((el) => el._id === workspaceId);

  const workspaceGroups = useMemo(() => {
    const groups: {
      name: 'workspace.owner' | 'workspace.member';
      workspaces: IWorkspace[];
    }[] = [
      { name: 'workspace.owner', workspaces: [] },
      { name: 'workspace.member', workspaces: [] },
    ];
    workspaces?.forEach((el) =>
      (me && el.owner.users.includes(me._id)
        ? groups[0]
        : groups[1]
      ).workspaces.push(el)
    );
    return groups.filter((el) => el.workspaces.length > 0);
  }, [workspaces, me]);

  const selectWorkspace = useCallback(
    (id: string) => {
      setOpened(false);
      if (id !== workspaceId) {
        navigateTo(getWorkspaceInstancePath(id));
      }
    },
    [workspaceId, navigateTo]
  );

  const createWorkspace = useCallback(() => {
    setOpened(false);
    toastInfo(f('common.underConstruction'));
  }, [f, toastInfo]);

  return (
    <Popover open={opened} onOpenChange={setOpened}>
      <PopoverTrigger asChild>
        <button
          className={clsx(
            'btn btn-ghost hover:border-transparent no-shadow',
            'max-w-[280px]',
            opened && 'bg-base-content/20 border-transparent'
          )}>
          <div className="w-full flex items-center">
            <Avatar className="flex-none w-8 h-8 mr-2 rounded-lg">
              <AvatarFallback className="bg-secondary text-secondary-content">
                {getFirstChar(currentWorkspace?.title || '')}
              </AvatarFallback>
            </Avatar>
            <div
              className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap text-left text-lg"
              title={currentWorkspace?.title}>
              {currentWorkspace?.title}
            </div>
            <HiChevronDown className="flex-none h-5 w-5 opacity-50 ml-2" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <Command>
          <CommandList>
            <ScrollArea
              className="px-2"
              viewportClassName="max-h-56"
              verticalBarClassName="w-2"
              vertical>
              {workspaceGroups.map((group) => (
                <CommandGroup key={group.name} heading={f(group.name)}>
                  {group.workspaces.map((el) => (
                    <CommandItem
                      key={el._id}
                      onSelect={selectWorkspace.bind(undefined, el._id)}
                      className={'text-sm'}>
                      {el.title}
                      <HiCheck
                        className={clsx(
                          'ml-auto h-4 w-4',
                          el._id === workspaceId ? 'opacity-100' : 'opacity-0'
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
              <CommandItem className="h-11 my-2" onSelect={createWorkspace}>
                <HiPlusCircle className="mr-2 h-6 w-6" />
                {f('workspace.createWorkspace')}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default observer(WorkspaceSwitcher);
