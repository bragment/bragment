import classNames from 'classnames';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { IProject } from '../../libs/client/types';

interface IProjectListProps {
  title?: React.ReactNode;
  projects?: IProject[];
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  renderProject: (project: IProject, index: number) => React.ReactNode;
}

const COLUMN_MIN_WIDTH = 180;
const GAP_PADDING = 32; // gap-8
const gridTemplateColumns = [
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
  'grid-cols-7',
  'grid-cols-8',
  'grid-cols-9',
  'grid-cols-10',
  'grid-cols-11',
  'grid-cols-12',
];
function calculateColumnCount(width: number) {
  return Math.max(1, Math.floor((width + GAP_PADDING) / (240 + GAP_PADDING)));
}
function getGridColumnCountClassName(index: number) {
  return gridTemplateColumns[
    Math.min(gridTemplateColumns.length, Math.max(0, index))
  ];
}

function ProjectList(props: IProjectListProps) {
  const { icon, title, projects, actions, renderProject } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const [paddingRight, setPaddingRight] = useState(0);
  const [columnCount, setColumnCount] = useState(1);

  const updateGridColumn = useCallback(() => {
    const width = divRef.current?.clientWidth || COLUMN_MIN_WIDTH;
    const count = calculateColumnCount(width);
    const remainder = (width - GAP_PADDING * (count - 1)) % count;
    setColumnCount(count);
    setPaddingRight(remainder);
  }, []);

  useLayoutEffect(() => {
    updateGridColumn();
  }, [updateGridColumn]);

  useEffect(() => {
    window.addEventListener('resize', updateGridColumn);
    return () => window.removeEventListener('resize', updateGridColumn);
  }, [updateGridColumn]);

  return (
    <div className="w-full p-6">
      {title && (
        <div className="w-full h-14 mb-2 flex items-center gap-3">
          {icon && <div className="flex-none">{icon}</div>}
          <div className="flex-auto font-bold text-lg">{title}</div>
          {actions && (
            <div className="flex-none flex items-center gap-3">{actions}</div>
          )}
        </div>
      )}
      <div
        ref={divRef}
        style={{ paddingRight }}
        className={classNames(
          'grid gap-8',
          getGridColumnCountClassName(columnCount - 1)
        )}>
        {projects?.map(renderProject)}
      </div>
    </div>
  );
}

export default memo(ProjectList);
