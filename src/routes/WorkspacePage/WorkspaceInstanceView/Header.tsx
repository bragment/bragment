import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiMenu, HiPlus, HiSearch } from 'react-icons/hi';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import { TOGGLE_ID } from './types';

function Header() {
  const f = useFormatMessage();
  const { toastInfo } = useDialogStore();
  const { setCreateProjectDialogVisible } = useDialogStore();

  const toastUnderConstruction = () => {
    toastInfo(f('common.underConstruction'));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // TODO: keywords search
      toastUnderConstruction();
    }
  };

  return (
    <header
      className={classNames(
        'bg-base-100 text-base-content',
        'sticky top-0 z-30',
        'w-full h-16',
        'bg-opacity-70 backdrop-blur transition-all duration-100',
        'group-[&.top-scrollable]:shadow-sm'
      )}>
      <div className="navbar p-3">
        <div className="flex-none mr-3 lg:hidden">
          <label
            htmlFor={TOGGLE_ID}
            className={classNames(
              'btn btn-ghost btn-square',
              'w-10 h-10 min-h-fit'
            )}>
            <HiMenu className="text-xl" />
          </label>
        </div>
        <div className="flex-1">
          <div className="relative flex items-center w-full max-w-xs [&:focus-within>:last-child]:invisible">
            <input
              className={classNames(
                'input input-bordered',
                'w-full h-10 pl-10'
              )}
              placeholder={f('common.search')}
              onKeyDown={handleKeyDown}
            />
            <HiSearch className="absolute left-3 text-xl text-base-content/60 pointer-events-none" />
            <div className="absolute right-3 flex items-center text-base-content/60 pointer-events-none">
              <div className="w-6 h-8 bg-gradient-to-l from-base-100 to-transparent" />
              <div className="w-auto bg-base-100">
                <kbd className="kbd kbd-sm">⌘</kbd> +{' '}
                <kbd className="kbd kbd-sm">K</kbd>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none ml-3">
          <button
            className={classNames(
              'btn btn-ghost btn-square',
              'w-10 h-10 min-h-fit'
            )}
            onClick={() => setCreateProjectDialogVisible(true)}>
            <HiPlus className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
