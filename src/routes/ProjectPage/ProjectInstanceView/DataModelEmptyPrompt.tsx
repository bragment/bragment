import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { HiOutlineDatabase, HiOutlinePlus } from 'react-icons/hi';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';

interface IDataModelEmptyPromptProps {
  creatable: boolean;
}

function DataModelEmptyPrompt(props: IDataModelEmptyPromptProps) {
  const { creatable } = props;
  const f = useFormatMessage();
  const { setCreateDataModelDialogVisible } = useDialogStore();
  const handleCreate = useCallback(() => {
    setCreateDataModelDialogVisible(true);
  }, [setCreateDataModelDialogVisible]);

  return (
    <div className={classNames('hero', 'min-h-[36rem]')}>
      <div className={classNames('hero-content', 'text-center')}>
        <div className="max-w-md flex flex-col items-center justify-center gap-3">
          <HiOutlineDatabase className="text-8xl font-bold text-warning" />
          <h1 className="text-2xl font-bold">{f('project.noDataModels')}</h1>
          <p>{f('project.getDataSourceStarted')}</p>
          {creatable && (
            <button className="btn btn-primary" onClick={handleCreate}>
              <HiOutlinePlus className="text-lg mr-3" />
              {f('project.createDataModel')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(DataModelEmptyPrompt);
