import { memo, useEffect, useRef } from 'react';
import { a, config, useTrail } from 'react-spring';
import Column from './Column';

interface IColumnListProps {
  columnIds: string[];
}

function ColumnList(props: IColumnListProps) {
  const { columnIds } = props;
  const animate = useRef(true);

  const trail = useTrail(columnIds.length, {
    config: { ...config.gentle, duration: 140 },
    opacity: 1,
    x: '0%',
    from: animate.current ? { opacity: 0, x: '60%' } : { opacity: 1, x: '0%' },
  });

  useEffect(() => {
    // NOTE: animate only first time
    animate.current = false;
  }, []);

  return (
    <>
      {trail.map((style, index) => {
        const columnId = columnIds[index];
        return (
          <a.div key={columnId} style={style}>
            <Column index={index} objectId={columnId} />
          </a.div>
        );
      })}
    </>
  );
}

export default memo(ColumnList);
