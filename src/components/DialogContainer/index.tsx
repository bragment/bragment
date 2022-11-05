import { lazy, memo, Suspense } from 'react';

const CreateDataFormDialog = lazy(
  () => import('../../dialogs/CreateDataFormDialog')
);
const CreateDataModelDialog = lazy(
  () => import('../../dialogs/CreateDataModelDialog')
);
const CreateDataRecordDialog = lazy(
  () => import('../../dialogs/CreateDataRecordDialog')
);
const CreateProjectDialog = lazy(
  () => import('../../dialogs/CreateProjectDialog')
);
const CreateWorkspaceDialog = lazy(
  () => import('../../dialogs/CreateWorkspaceDialog')
);

function DialogContainer() {
  return (
    <Suspense fallback={<></>}>
      <section>
        <CreateWorkspaceDialog />
        <CreateProjectDialog />
        <CreateDataModelDialog />
        <CreateDataFormDialog />
        <CreateDataRecordDialog />
      </section>
    </Suspense>
  );
}

export default memo(DialogContainer);
