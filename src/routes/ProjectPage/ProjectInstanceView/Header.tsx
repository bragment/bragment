import { MenuIcon } from 'lucide-react';
import { observer } from 'mobx-react';
import { TOGGLE_ID } from './types';
import DataViewSwitcher from '@/components/DataViewSwitcher';
import { IModelViewGroup } from '@/components/DataViewSwitcher/types';

function Header(props: { modelViewGroups: IModelViewGroup[] }) {
  const { modelViewGroups } = props;
  return (
    <header>
      <div className="navbar">
        <div className="flex-none lg:hidden">
          <label htmlFor={TOGGLE_ID} className="btn btn-square btn-ghost">
            <MenuIcon className="w-6 h-6" />
          </label>
        </div>
        <div className="flex-none px-2 lg:px-4">
          <DataViewSwitcher modelViewGroups={modelViewGroups} />
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
