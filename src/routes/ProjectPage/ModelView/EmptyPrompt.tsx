import classNames from 'classnames';
import { memo } from 'react';
import { HiOutlineDatabase, HiOutlinePlus } from 'react-icons/hi';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import PrimaryButton from '../../../components/PrimaryButton';

function ModelEmptyPrompt() {
  const f = useFormatMessage();
  const { setCreateDataModelDialogVisible } = useDialogStore();
  const handleCreate = () => setCreateDataModelDialogVisible(true);

  return (
    <div className={classNames('hero', 'min-h-[36rem]')}>
      <div className={classNames('hero-content', 'text-center')}>
        <div className="max-w-md flex flex-col items-center justify-center gap-3">
          <HiOutlineDatabase className="text-8xl font-bold text-amber-500" />
          <h1 className="text-2xl font-bold">{f('project.noModels')}</h1>
          <p>{f('project.getModelStarted')}</p>
          <PrimaryButton
            fromColor="from-orange-400"
            toColor="to-fuchsia-500"
            onClick={handleCreate}>
            <HiOutlinePlus className="text-lg mr-3 " />
            {f('project.createModel')}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default memo(ModelEmptyPrompt);
