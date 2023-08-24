import { HeaderContext } from '@tanstack/react-table';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import {
  COLUMN_SEQUENCE_WIDTH,
  ICreateColumnListOptions,
  ICreateRecordInputRef,
} from '../types';
import { IProjectDataRecord } from '@/libs/client/types';

const padding = 8;

function adjustWidthAndZIndex(div?: HTMLElement | null) {
  const viewport = div?.closest('[data-radix-scroll-area-viewport]');
  const th = div?.closest('th');
  if (div && viewport && th) {
    div.style.setProperty(
      'width',
      `${viewport.clientWidth - padding * 2 - 1}px`
    );
    th.style.setProperty('z-index', '1');
    th.style.setProperty('position', 'sticky');
    th.style.setProperty('left', '0');
  }
}

function AddRow({
  project,
  model,
  view,
  CreateRecordInput,
}: ICreateColumnListOptions & HeaderContext<IProjectDataRecord, unknown>) {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ICreateRecordInputRef>(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    adjustWidthAndZIndex(divRef.current);
  });

  useEffect(() => {
    const handleResize = () => adjustWidthAndZIndex(divRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return CreateRecordInput ? (
    <div ref={divRef} className="flex flex-row items-center justify-center">
      <div
        style={{ width: COLUMN_SEQUENCE_WIDTH - padding * 2 }}
        className="flex-none text-center">
        <button
          className="btn btn-ghost btn-sm btn-square no-shadow"
          onClick={inputRef.current?.focus}>
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <LuPlus className="text-lg" />
          )}
        </button>
      </div>
      <div className="flex-auto mx-3">
        <CreateRecordInput
          ref={inputRef}
          project={project}
          model={model}
          view={view}
          onLoadingChange={setLoading}
        />
      </div>
    </div>
  ) : null;
}

export default AddRow;
