import { observer } from 'mobx-react';
import { HiBars3 } from 'react-icons/hi2';
import { TOGGLE_ID } from './types';
import DataViewSwitcher from '@/components/DataViewSwitcher';
import { IModelViewGroup } from '@/components/DataViewSwitcher/types';
import { IProjectDataModel } from '@/libs/client/types';

interface IHeaderProps {
  currentModel?: IProjectDataModel;
  modelViewGroups: IModelViewGroup[];
}

function Header(props: IHeaderProps) {
  const { currentModel, modelViewGroups } = props;
  return (
    <header>
      <div className="navbar">
        <div className="flex-none lg:hidden">
          <label htmlFor={TOGGLE_ID} className="btn btn-square btn-ghost">
            <HiBars3 className="w-6 h-6" />
          </label>
        </div>
        <div className="flex-none px-2 ml-2 hidden lg:flex justify-center">
          <div className="max-w-[200px] overflow-hidden text-ellipsis capitalize font-semibold text-lg">
            {currentModel?.title}
          </div>
        </div>
        <div className="flex-none px-2 lg:px-4">
          <DataViewSwitcher modelViewGroups={modelViewGroups} />
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
